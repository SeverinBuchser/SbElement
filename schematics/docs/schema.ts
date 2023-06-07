export interface Schema {
  docConfig: string;
  project: string;
  path: string;
}

export function validate(schema: Partial<Schema>): schema is Schema {
  if (!schema.path) {
    schema.path = '';
  }

  if (!schema.docConfig) {
    throw new SchemaValidationError(`The schema is missing docConfig`, schema);
  }  
  return true;
}


class SchemaValidationError extends Error {
  constructor(message: string, schema: Partial<Schema>) {
    super(`${message}, found ${JSON.stringify(schema)}`)
  }
}