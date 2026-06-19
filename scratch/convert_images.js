/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicHomeDir = path.join(__dirname, '..', 'public', 'home');

const imagesToConvert = [
  { name: 'Img1.png', output: 'Img1.webp' },
  { name: 'Img2.png', output: 'Img2.webp' },
  { name: 'Imagen.png', output: 'Imagen.webp' },
  { name: 'Imagen Light.png', output: 'Imagen Light.webp' }
];

async function run() {
  for (const img of imagesToConvert) {
    const inputPath = path.join(publicHomeDir, img.name);
    const outputPath = path.join(publicHomeDir, img.output);
    
    if (!fs.existsSync(inputPath)) {
      console.error(`File not found: ${inputPath}`);
      continue;
    }
    
    console.log(`Converting ${img.name} to WebP...`);
    
    try {
      const info = await sharp(inputPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);
      
      const originalSize = (fs.statSync(inputPath).size / 1024).toFixed(2);
      const newSize = (info.size / 1024).toFixed(2);
      console.log(`Success! Saved to ${img.output}`);
      console.log(`Original size: ${originalSize} KB`);
      console.log(`Optimized size: ${newSize} KB`);
      console.log(`Reduction: ${(((originalSize - newSize) / originalSize) * 100).toFixed(2)}%`);
    } catch (err) {
      console.error(`Error converting ${img.name}:`, err);
    }
  }
}

run();
