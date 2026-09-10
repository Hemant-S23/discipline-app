const fs = require('fs');
const path = require('path');

const wwwDir = path.join(__dirname, 'www');

// Clean or create www folder
if (fs.existsSync(wwwDir)) {
  fs.rmSync(wwwDir, { recursive: true, force: true });
}
fs.mkdirSync(wwwDir, { recursive: true });

// Copy file or directory recursively
function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursive(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else if (exists) {
    fs.copyFileSync(src, dest);
  }
}

const itemsToCopy = [
  'index.html',
  'manifest.json',
  'sw.js',
  'favicon.ico',
  'favicon.svg',
  'css',
  'js',
  'icons'
];

itemsToCopy.forEach((item) => {
  const srcPath = path.join(__dirname, item);
  const destPath = path.join(wwwDir, item);
  if (fs.existsSync(srcPath)) {
    copyRecursive(srcPath, destPath);
    console.log(`Copied ${item} -> www/${item}`);
  }
});

console.log('Build completed: www directory is ready for Capacitor.');
