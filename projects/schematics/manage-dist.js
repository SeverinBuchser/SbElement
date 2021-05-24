const path = require('path');
const fs = require('fs');

const distDir = path.join(__dirname, 'dist');
const srcDir = path.join(__dirname, 'src');

/*
 * Gets a list of all files inside a directory. This includes especially files
 * in all subdirectories. 
 */
function getFilesRecursice(dir) {
  var dirInformation = getDirInformation(dir);
  var files = dirInformation.files;
  if (dirInformation.dirs.length > 0) {
    dirInformation.dirs.forEach(subDir => {
      files = files.concat(getFilesRecursice(subDir));
    })
  }
  return files;
}

/*
 * Retreives all files and directories inside a directory. The paths to the
 * directories are complete paths, so that there is no need to join the paths
 * in the next iteration.
 */
function getDirInformation(dir) {
  var dirInformation = {files: [], dirs: []};

  fs.readdirSync(dir).forEach(node => {
    nodePath = path.resolve(dir, node);
    if (fs.statSync(nodePath).isDirectory()) {
      dirInformation.dirs.push(nodePath);
    } else {
      dirInformation.files.push(nodePath);
    }
  })
  return dirInformation;
}

/*
 * Gets the files recursively, creates the necessary direcotries for each file
 * to be in and copys the file in the correct folders into the dist folder.
 */
getFilesRecursice(srcDir).forEach(file => {
  var childPath = file.split(srcDir)[1];
  var toDir = path.join(distDir, path.parse(childPath).dir);
  var toPath = path.join(distDir, childPath);

  fs.mkdirSync(toDir, { recursive: true });
  fs.copyFileSync(file, toPath);
})
