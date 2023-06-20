import Ajv, { ValidateFunction } from "ajv";
import { DocConfig } from "./doc-config";

const docConfigSchema = {
  "$schema": "http://json-schema.org/schema",
  "$id": "DocConfig",
  "title": "Schema for Documentaion Configuration",
  "type": "object",
  "description": "",
  "additionalProperties": false,
  "properties": {
    "ngModuleConfigs": {
      "type": "array",
      "description": "Configurations, linking angular modules to angular example components.",
      "items": {
        "type": "object",
        "properties": {
          "ngModuleName": {
            "type": "string",
            "description": "The name of the angular module."
          },
          "exampleNgComponent": {
            "type": "string",
            "description": "The name of the angular example component."
          },
          "exampleNgComponentPath": {
            "type": "string",
            "description": "The path of to the angular example component."
          }
        },
        "required": [
          "ngModuleName",
          "exampleNgComponent",
          "exampleNgComponentPath"
        ]
      },
      "default": []
    },
    "ngPackage": {
      "type": "string",
      "description": "The path to the angular package."
    },
    "tsConfig": {
      "type": "string",
      "description": "The path to the typescript config."
    }
  },
  "required": [
    "ngModuleConfigs",
    "ngPackage",
    "tsConfig"
  ]
}

export function validateDocConfig(docConfigObject: any): docConfigObject is DocConfig {
  const ajv = new Ajv()
  const validator = ajv.compile(docConfigSchema);
  const valid = validator(docConfigObject);
  if (!valid) throw new Error(ajv.errorsText(validator.errors))
  return valid;
}