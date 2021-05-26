export function findStylePath(newStylePath: string): (styleObject: any) => boolean {
  return (styleObject: any) => {
    if (typeof styleObject === "string") {
      return styleObject === newStylePath
    } else {
      if (styleObject.input) return styleObject.input === newStylePath;
      else return false;
    }
  }
}


export function addPathToArray(array: Array<any>, newStylePath: string): boolean {
  let exists = array.find(findStylePath(newStylePath));
  if (exists) return false;
  else {
    array.push(newStylePath);
    return true;
  }
}
