import { Generatable, LineJoiner } from "../util";

export class Exporter extends LineJoiner<Export> {}

export abstract class Export implements Generatable {
  constructor(protected _path: string) {}
  public abstract generate(): string;
}

export class ExportNames extends Export {

  constructor(path: string, private _names: Array<string>) {
    super(path);
    if (this._names.length == 0) {
      throw new Error("ImportNames: At least one import is needed")
    }
  }

  public generate(): string {
    return `export { ${this._names.join(', ')} } from '${this._path}';`;
  }
}

export class ExportAll extends Export {
  public generate(): string {
    return `export * from '${this._path}';`;
  }
}