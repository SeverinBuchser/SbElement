export interface Schema {
  docConfigFile: string;
  path: string;
  project: string;
}

export function validate(schema: Partial<Schema>): schema is Schema {
  if (!schema.path) {
    schema.path = '';
  }

  if (!schema.docConfigFile) {
    throw new SchemaValidationError(`The schema is missing the docConfigFile`, schema);
  }

  if (!schema.project) {
    throw new SchemaValidationError(`The schema is missing the project`, schema);
  }

  return true;
}


class SchemaValidationError extends Error {
  constructor(message: string, schema: Partial<Schema>) {
    super(`${message}, found ${JSON.stringify(schema)}`)
  }
}