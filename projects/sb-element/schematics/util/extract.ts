import { CheckedComponentSchema } from "./component-schema";

export function extractComponentOptions<SchemaType extends CheckedComponentSchema>(options: SchemaType): CheckedComponentSchema {
  return {
    name: options.name,
    path: options.path,
    project: options.project
  }
}
