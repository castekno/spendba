import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { fetchLiveTendersFromPTBA } from './src/services/spendBukitAsamApi';

const app = express();
const PORT = 3000;

let cachedTenders: any = null;
let lastCacheTime = 0;

// API routes FIRST
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/lelang', async (req, res) => {
  const isForce = req.query.refresh === '1';
  const now = Date.now();

  // Return cache if valid (30 seconds cache to prevent spamming PTBA servers)
  if (!isForce && cachedTenders && now - lastCacheTime < 30000) {
    return res.json({
      status: true,
      source: 'cache',
      count: cachedTenders.length,
      data: cachedTenders,
    });
  }

  try {
    const liveTenders = await fetchLiveTendersFromPTBA();
    if (liveTenders && liveTenders.length > 0) {
      cachedTenders = liveTenders;
      lastCacheTime = Date.now();
      return res.json({
        status: true,
        source: 'spend.bukitasam.co.id',
        count: liveTenders.length,
        data: liveTenders,
      });
    }

    // If live returned empty but we have cached, return cached
    if (cachedTenders) {
      return res.json({
        status: true,
        source: 'stale-cache',
        count: cachedTenders.length,
        data: cachedTenders,
      });
    }

    return res.json({
      status: true,
      source: 'empty',
      count: 0,
      data: [],
    });
  } catch (error: any) {
    console.error('Error fetching from spend.bukitasam.co.id:', error);
    if (cachedTenders) {
      return res.json({
        status: true,
        source: 'fallback-cache',
        count: cachedTenders.length,
        data: cachedTenders,
      });
    }
    return res.status(502).json({
      status: false,
      message: 'Gagal mengambil data dari portal spend.bukitasam.co.id',
      error: error?.message || 'Network error',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
