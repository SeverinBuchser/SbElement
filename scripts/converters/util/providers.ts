import { AngularProvider } from "../../util";

export function convertAngularProviders(
  providers: Array<any>
): Array<AngularProvider> {
  return providers.map((provider: any) => {
    if (typeof provider == 'string') {
      return {
        defaultProvider: provider
      }
    } else if (provider.useValue) {
      return {
        valueProvider: {
          provide: provider.provide,
          multi: provider.multi,
          useValue: provider.useValue
        }
      }
    } else if (provider.useClass) {
      return {
        classProvider: {
          provide: provider.provide,
          multi: provider.multi,
          useClass: provider.useClass
        }
      }
    } else if (provider.deps && !provider.useFactory) {
      return {
        constructorProvider: {
          provide: provider.provide,
          multi: provider.multi,
          deps: provider.deps
        }
      }
    } else if (provider.useExisting) {
      return {
        existingProvier: {
          provide: provider.provide,
          multi: provider.multi,
          useExisting: provider.useExisting
        }
      }
    } else if (provider.useFactory) {
      return {
        factoryProvider: {
          provide: provider.provide,
          multi: provider.multi,
          useFactory: provider.useFactory,
          deps: provider.deps
        }
      }
    }
    return {
      otherProvider: provider
    }
  })
}