const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Define paths
const svgPath = path.join(__dirname, 'src', 'assets', 'logo.svg');
const pngPath = path.join(__dirname, 'src', 'assets', 'logo.png');

// Check if SVG file exists
if (!fs.existsSync(svgPath)) {
  console.error(`SVG file not found at ${svgPath}`);
  process.exit(1);
}

// Convert SVG to PNG
async function convertSvgToPng() {
  try {
    console.log('Converting SVG to PNG...');
    await sharp(svgPath)
      .resize(1024, 1024) // Resize to 1024x1024 for high quality
      .png()
      .toFile(pngPath);
    
    console.log(`Successfully converted SVG to PNG at ${pngPath}`);
  } catch (error) {
    console.error('Error converting SVG to PNG:', error);
    process.exit(1);
  }
}

// Run the conversion
convertSvgToPng();
