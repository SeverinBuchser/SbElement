export interface ComponentSchema {
  name: string;
  path?: string;
  project?: string;
}

export interface CheckedComponentSchema extends ComponentSchema {
  name: string;
  path: string;
  project: string;
}
