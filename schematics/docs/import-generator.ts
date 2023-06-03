import { Generatable, LineJoiner } from "../util";

export class Importer extends LineJoiner<Import> {}

export abstract class Import implements Generatable {
  constructor(protected _path: string) {}
  public abstract generate(): string;
}

export class ImportNames extends Import {

  constructor(path: string, private _names: Array<string>) {
    super(path);
    if (this._names.length == 0) {
      throw new Error("ImportNames: At least one import is needed")
    }
  }

  public generate(): string {
    return `import { ${this._names.join(', ')} } from '${this._path}';`;
  }
}

export class ImportAs extends Import {
  private _as: string;
  constructor(path: string, as: string) {
    super(path);
    if (as == '') {
      throw new Error(`ImportAs: The "as" parameter cannot be an empty string`)
    }
    this._as = as;
  }

  public generate(): string {
    return `import * as ${this._as} from '${this._path}';`;
  }
}