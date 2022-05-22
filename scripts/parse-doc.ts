import { resolve } from 'path';
import { 
  Application, 
  Context, 
  Converter, 
  Reflection, 
  TSConfigReader, 
  TypeDocReader 
} from 'typedoc';
import { parseDecoratorArguments } from './decorator-parser';

const app = new Application();

app.options.addReader(new TypeDocReader());
app.options.addReader(new TSConfigReader());

app.bootstrap({
  options: resolve('src/sb-element/typedoc.json')
})

app.converter.on(Converter.EVENT_CREATE_DECLARATION, 
  <T extends Reflection>(context: Context, reflection: T) => {
  reflection.decorators?.forEach(decorator => {
    decorator.arguments = parseDecoratorArguments(decorator.arguments);
  })
})

app.convert();