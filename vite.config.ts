import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import { fetchLiveTendersFromPTBA } from './src/services/spendBukitAsamApi';

let cachedTenders: any = null;
let lastCacheTime = 0;

function lelangApiPlugin(): Plugin {
  return {
    name: 'vite-plugin-lelang-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/lelang')) {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          const isForce = req.url.includes('refresh=1');
          const now = Date.now();

          if (!isForce && cachedTenders && now - lastCacheTime < 30000) {
            res.end(
              JSON.stringify({
                status: true,
                source: 'cache',
                count: cachedTenders.length,
                data: cachedTenders,
              })
            );
            return;
          }

          try {
            const data = await fetchLiveTendersFromPTBA();
            if (data && data.length > 0) {
              cachedTenders = data;
              lastCacheTime = Date.now();
              res.end(
                JSON.stringify({
                  status: true,
                  source: 'spend.bukitasam.co.id',
                  count: data.length,
                  data,
                })
              );
              return;
            }

            if (cachedTenders) {
              res.end(
                JSON.stringify({
                  status: true,
                  source: 'stale-cache',
                  count: cachedTenders.length,
                  data: cachedTenders,
                })
              );
              return;
            }

            res.end(JSON.stringify({ status: true, source: 'empty', count: 0, data: [] }));
            return;
          } catch (err: any) {
            console.error('API /api/lelang error:', err);
            if (cachedTenders) {
              res.end(
                JSON.stringify({
                  status: true,
                  source: 'fallback-cache',
                  count: cachedTenders.length,
                  data: cachedTenders,
                })
              );
              return;
            }
            res.statusCode = 502;
            res.end(
              JSON.stringify({
                status: false,
                message: 'Gagal mengambil data dari spend.bukitasam.co.id',
                error: err?.message,
              })
            );
            return;
          }
        }
        next();
      });
    },
  };
}

// LINT.IfChange(aistudio_media_plugin)
function aistudioMediaPlugin(): Plugin {
  return {
    name: 'vite-plugin-aistudio-media',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/assets/aistudio/')) {
          const rawPath = req.url.split('?')[0].split('#')[0];
          try {
            const decodedPath = decodeURIComponent(rawPath);
            const relativePath = decodedPath.replace(/^\//, '');
            const aistudioDir = path.resolve(
              __dirname,
              'public',
              'assets',
              'aistudio',
            );
            const filePath = path.resolve(__dirname, 'public', relativePath);
            if (
              filePath.startsWith(aistudioDir + path.sep) &&
              fs.existsSync(filePath) &&
              fs.statSync(filePath).isFile()
            ) {
              const ext = path.extname(filePath).toLowerCase();
              const mimeMap: Record<string, string> = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.webp': 'image/webp',
                '.svg': 'image/svg+xml',
                '.bmp': 'image/bmp',
                '.ico': 'image/x-icon',
                '.mp4': 'video/mp4',
                '.webm': 'video/webm',
                '.ogv': 'video/ogg',
                '.mp3': 'audio/mpeg',
                '.wav': 'audio/wav',
                '.ogg': 'audio/ogg',
                '.pdf': 'application/pdf',
              };
              res.setHeader(
                'Content-Type',
                mimeMap[ext] || 'application/octet-stream',
              );
              res.setHeader('Cache-Control', 'no-cache');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          } catch {
            // Fall through if URI decoding or file access fails
          }
        }
        next();
      });
    },
  };
}
// LINT.ThenChange(//depot/google3/java/com/google/alkali/boq/makersuite/applet_dev_service/templates/initializers/react_theme/vite.config.ts:aistudio_media_plugin)

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), aistudioMediaPlugin(), lelangApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
