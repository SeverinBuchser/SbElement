const path = require('path');
const fs = require('fs');

const distDir = path.join(__dirname, '../../dist/sb-element/schematics');
fs.rmSync(distDir, { recursive: true, force: true })
