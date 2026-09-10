const fs = require('fs');
const path = require('path');

const src192 = path.join(__dirname, 'icons', 'icon-192.png');
const src512 = path.join(__dirname, 'icons', 'icon-512.png');
const resDir = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');

const mipmaps = [
  'mipmap-hdpi',
  'mipmap-mdpi',
  'mipmap-xhdpi',
  'mipmap-xxhdpi',
  'mipmap-xxxhdpi'
];

mipmaps.forEach((m) => {
  const targetDir = path.join(resDir, m);
  if (fs.existsSync(targetDir)) {
    fs.copyFileSync(src192, path.join(targetDir, 'ic_launcher.png'));
    fs.copyFileSync(src192, path.join(targetDir, 'ic_launcher_round.png'));
    fs.copyFileSync(src192, path.join(targetDir, 'ic_launcher_foreground.png'));
    console.log(`Updated icons in ${m}`);
  }
});

// Use 512 for xxxhdpi if desired
const xxxhdpi = path.join(resDir, 'mipmap-xxxhdpi');
if (fs.existsSync(xxxhdpi)) {
  fs.copyFileSync(src512, path.join(xxxhdpi, 'ic_launcher.png'));
  fs.copyFileSync(src512, path.join(xxxhdpi, 'ic_launcher_round.png'));
}

console.log('All Android launcher icons successfully updated.');
