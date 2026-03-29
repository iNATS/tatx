const fs = require('fs');
const path = require('path');

const distDir = path.join(process.cwd(), process.env.DIST_DIR || 'dist-web');
const webDir = path.join(process.cwd(), 'web');

const assetsToCopy = ['manifest.json', 'sw.js', 'pwa-icon-192.png', 'pwa-icon-512.png'];

if (!fs.existsSync(distDir)) {
  process.exit(0);
}

for (const asset of assetsToCopy) {
  const sourcePath = path.join(webDir, asset);
  const targetPath = path.join(distDir, asset);

  if (!fs.existsSync(sourcePath)) {
    continue;
  }

  fs.copyFileSync(sourcePath, targetPath);
}
