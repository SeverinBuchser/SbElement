import { AngularProvider, AngularResolvedProvider } from "../../util";
import {
  DeclarationReflection, ReferenceReflection
} from "typedoc";


export function resolveProviders(
  providers: Array<AngularProvider>,
  reflection: DeclarationReflection
): Array<AngularResolvedProviderWrapper> {
  return providers.map((provider: AngularProvider) => {
    let newProvider: any = {};
    if (provider.defaultProvider) {
      newProvider = { 
        defaultProvider: new ReferenceReflection(
          provider.defaultProvider,
          reflection.findReflectionByName(provider.defaultProvider),
          reflection
        )
      }; 
    } else if (provider.valueProvider) {
      newProvider = { 
        valueProvider: {
          provide: new ReferenceReflection(
            provider.valueProvider.provide,
            reflection.findReflectionByName(provider.valueProvider.provide),
            reflection
          ),
          multi: provider.valueProvider.multi,
          useValue: provider.valueProvider.useValue
        }
      }; 
    } else if (provider.classProvider) {
      newProvider = { 
        existingProvier: {
          provide: new ReferenceReflection(
            provider.classProvider.provide,
            reflection.findReflectionByName(provider.classProvider.provide),
            reflection
          ),
          multi: provider.classProvider.multi,
          useClass: new ReferenceReflection(
            provider.classProvider.useClass,
            reflection.findReflectionByName(provider.classProvider.useClass),
            reflection
          )
        }
      };  
    } else if (provider.constructorProvider) {
      newProvider = { 
        constructorProvider: {
          provide: new ReferenceReflection(
            provider.constructorProvider.provide,
            reflection.findReflectionByName(provider.constructorProvider.provide),
            reflection
          ),
          multi: provider.constructorProvider.multi,
          deps: provider.constructorProvider.deps
        }
      };
    } else if (provider.existingProvier) {
      newProvider = { 
        existingProvier: {
          provide: new ReferenceReflection(
            provider.existingProvier.provide,
            reflection.findReflectionByName(provider.existingProvier.provide),
            reflection
          ),
          multi: provider.existingProvier.multi,
          useExisting: new ReferenceReflection(
            provider.existingProvier.useExisting,
            reflection.findReflectionByName(provider.existingProvier.useExisting),
            reflection
          )
        }
      };  
    } else if (provider.factoryProvider) {
      newProvider = { 
        factoryProvider: {
          provide: new ReferenceReflection(
            provider.factoryProvider.provide,
            reflection.findReflectionByName(provider.factoryProvider.provide),
            reflection
          ),
          multi: provider.factoryProvider.multi,
          useFactory: new ReferenceReflection(
            provider.factoryProvider.useFactory,
            reflection.findReflectionByName(provider.factoryProvider.useFactory),
            reflection
          ),
          deps: provider.factoryProvider.deps
        }
      };  
    } else {
      newProvider = { otherProvider: provider.otherProvider };  
    }
    return new AngularResolvedProviderWrapper(newProvider);
  }) as Array<AngularResolvedProviderWrapper>;
}


export class AngularResolvedProviderWrapper {
  constructor(public provider: AngularResolvedProvider) {}
}