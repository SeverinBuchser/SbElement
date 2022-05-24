import { Serializer, SerializerComponent } from "typedoc";
import { inspect } from "util";
import { AngularResolvedProviderWrapper } from "../../resolvers";

export class AngularProviderSerializer extends SerializerComponent<any> {

  constructor(serializer: Serializer) {
    super(serializer);
  }

  override get priority(): number {
    return 1;
  }

  public serializeGroup(instance: any): boolean {
    return instance instanceof AngularResolvedProviderWrapper
  }

  public supports(item: any): boolean {
    return this.serializeGroup(item);
  }

  public toObject({ provider }: AngularResolvedProviderWrapper, obj: any = {}): any {
    if (provider.defaultProvider) {
      return {
        ...obj,
        ...this.owner.toObject(provider.defaultProvider)
      }; 
    } else if (provider.valueProvider) {
      return { 
        ...obj,
        provide: this.owner.toObject(provider.valueProvider.provide),
        multi: provider.valueProvider.multi,
        useValue: this.owner.toObject(provider.valueProvider.useValue)
      }; 
    } else if (provider.classProvider) {
      return { 
        ...obj,
        provide: this.owner.toObject(provider.classProvider.provide),
        multi: provider.classProvider.multi,
        useClass: this.owner.toObject(provider.classProvider.useClass)
      }; 
    } else if (provider.constructorProvider) {
      return { 
        ...obj,
        provide: this.owner.toObject(provider.constructorProvider.provide),
        multi: provider.constructorProvider.multi,
        deps: provider.constructorProvider.deps
      }; 
    } else if (provider.existingProvier) {
      return { 
        ...obj,
        provide: this.owner.toObject(provider.existingProvier.provide),
        multi: provider.existingProvier.multi,
        useExisting: this.owner.toObject(provider.existingProvier.useExisting)
      };   
    } else if (provider.factoryProvider) {
      return { 
        ...obj,
        provide: this.owner.toObject(provider.factoryProvider.provide),
        multi: provider.factoryProvider.multi,
        useFactory: this.owner.toObject(provider.factoryProvider.useFactory),
        deps: provider.factoryProvider.deps
      }; 
    } 

    return {
      ...obj,
      ...provider.otherProvider
    };     
  }
  
}