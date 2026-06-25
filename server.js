import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { extname, join, resolve } from 'path';

const root = resolve('build');
const port = Number(process.env.PORT || 4100);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8'
};

createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const filePath = join(root, urlPath === '/' ? 'index.html' : urlPath.replace(/^\//, ''));
  let target = filePath;
  if (!existsSync(target) || statSync(target).isDirectory()) target = join(root, 'index.html');

  try {
    const data = readFileSync(target);
    res.statusCode = 200;
    res.setHeader('Content-Type', types[extname(target)] || 'application/octet-stream');
    res.end(data);
  } catch {
    res.statusCode = 503;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Build output missing');
  }
}).listen(port, '0.0.0.0', () => {
  console.log(`serving dist on ${port}`);
});
