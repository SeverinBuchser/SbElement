import { Serializer } from 'typedoc';
import { AngularComponentDecoratorSerializer } from './component';
import { AngularDirectiveDecoratorSerializer } from './directive';
import { AngularModuleDecoratorSerializer } from './module';
import { addUtilsToSerializer } from './util';

export function addToSerializer(serializer: Serializer): void {
  serializer.addSerializer(new AngularModuleDecoratorSerializer(serializer))
  serializer.addSerializer(new AngularComponentDecoratorSerializer(serializer))
  serializer.addSerializer(new AngularDirectiveDecoratorSerializer(serializer))
  addUtilsToSerializer(serializer)
}