import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'clean-tailwind-directives',
      closeBundle() {
        const outDir = 'build/assets';
        if (!existsSync(outDir)) return;
        for (const f of readdirSync(outDir)) {
          if (!f.endsWith('.css')) continue;
          const p = join(outDir, f);
          const content = readFileSync(p, 'utf-8');
          const cleaned = content.replace(/@tailwind\s+\w+;?\s*/g, '');
          if (cleaned !== content) {
            writeFileSync(p, cleaned);
            console.log(`cleaned @tailwind directives from ${f}`);
          }
        }
      }
    }
  ],
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
  server: { host: '0.0.0.0', port: 4100 }
});
