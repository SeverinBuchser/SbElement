import { CheckedComponentSchema, ComponentSchema } from "../util/component-schema";

export interface Schema extends ComponentSchema {
  sizing: boolean;
  theming: boolean;
  coloring: boolean;
}

export interface CheckedSchema extends CheckedComponentSchema {
  sizing: boolean;
  theming: boolean;
  coloring: boolean;
}
