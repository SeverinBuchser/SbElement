const path = require('path');
const fs = require('fs');

const distDir = path.join(__dirname, 'dist');
fs.rmSync(distDir, { recursive: true, force: true })
