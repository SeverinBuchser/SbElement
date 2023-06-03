import { Tree } from '@angular-devkit/schematics';
import { read } from '../util';

export class DocConfig {
  private _moduleConfigs: Array<ModuleDocConfig> = new Array();

  constructor(private _host: Tree, private _configFile: string) {
    if (!this._host.exists(this._configFile)) {
      throw new Error(`DocConfig: The config file "${this._configFile} does not exist`)
    }
    let configContent = read(this._host, this._configFile);
    let configObject: any;
    try {
      configObject = JSON.parse(configContent);
    } catch (error) {
      throw new Error("DocConfig: The config content cannot be parsed")
    }
    this._moduleConfigs = this._validate(configObject)
  }

  public get(moduleName: string): ModuleDocConfig | undefined {
    return this._moduleConfigs.find((config: ModuleDocConfig) => {
      return config.moduleName == moduleName;
    })
  }

  private _validate(configObject: Array<ModuleDocConfig>): Array<ModuleDocConfig> {
    if (!Array.isArray(configObject)) {
      throw new Error("DocConfig: The config is not an array!")
    }

    configObject.forEach((config: ModuleDocConfig) => {
      if (!config.moduleName) {
        throw new Error("ModuleDocConfig: The moduleName is undefined")
      }
      if (!config.exampleComponent) {
        throw new Error("ModuleDocConfig: The exampleComponent is undefined")
      }
      if (!config.exampleComponentPath) {
        throw new Error("ModuleDocConfig: The exampleComponentPath is undefined")
      }
      if (
        !this._host.exists(config.exampleComponentPath) && 
        !this._host.getDir(config.exampleComponentPath)
      ) {
        throw new Error(`ModuleDocConfig: The path ${config.exampleComponentPath} does `
          + 'not exist');
      }
    })
    return configObject;
  }
}

export interface ModuleDocConfig {
  moduleName: string;
  exampleComponent: string;
  exampleComponentPath: string;
}