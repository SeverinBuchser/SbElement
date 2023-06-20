import { Tree } from '@angular-devkit/schematics';
import { read } from '../util';
import { validateDocConfig } from './doc.config.schema';

export class DocConfig {
  public ngModuleConfigs: Array<ModuleDocConfig> = new Array();
  public ngPackage: string = "";
  public tsConfig: string = "";

  constructor(private _host: Tree, private _configFile: string) {
    this._validate();
  }

  private _validate(): void {
    if (!this._host.exists(this._configFile)) {
      throw new Error(`DocConfig: The config file "${this._configFile} does not exist`)
    }
    let configContent = read(this._host, this._configFile);

    let docConfigObject: any;
    try {
      docConfigObject = JSON.parse(configContent);
    } catch (error) {
      throw new Error("DocConfig: The config content cannot be parsed")
    }

    if (validateDocConfig(docConfigObject)) {
      Object.assign(this, docConfigObject);
      console.log(this)
    }
  }

  public get(moduleName: string): ModuleDocConfig | undefined {
    return this.ngModuleConfigs.find((config: ModuleDocConfig) => {
      return config.ngModuleName == moduleName;
    })
  }
}

export interface ModuleDocConfig {
  ngModuleName: string;
  exampleNgComponent: string;
  exampleNgComponentPath: string;
}