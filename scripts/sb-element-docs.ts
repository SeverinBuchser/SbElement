import { writeFileSync } from "fs";
import { resolve } from "path";
import { parseDocs } from "./parse-doc";


writeFileSync(
  resolve('src/example-app/assets/doc/sb-element.json'),
  JSON.stringify(parseDocs().get('SbElementModule'), null, '\t')
);