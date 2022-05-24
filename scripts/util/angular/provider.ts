import { ReferenceReflection } from "typedoc";

export interface AngularProvider {
  defaultProvider?: string;
  valueProvider?: AngularValueProvider;
  classProvider?: AngularClassProvider;
  constructorProvider?: AngularConstructorProvider;
  existingProvier?: AngularExistingProvider;
  factoryProvider?: AngularFactoryProvider;
  otherProvider?: any;
}

export interface AngularValueProvider {
  provide: string;
  multi?: string;
  useValue: any;
}

export interface AngularClassProvider {
  provide: string;
  multi?: string;
  useClass: string;
}

export interface AngularConstructorProvider {
  provide: string;
  multi?: string;
  deps?: Array<any>;
}

export interface AngularExistingProvider {
  provide: string;
  multi?: string;
  useExisting: any;
}

export interface AngularFactoryProvider {
  provide: string;
  multi?: string;
  useFactory: string;
  deps?: Array<any>;
}

export interface AngularResolvedProvider {
  defaultProvider?: ReferenceReflection;
  valueProvider?: AngularResolvedValueProvider;
  classProvider?: AngularResolvedClassProvider;
  constructorProvider?: AngularResolvedConstructorProvider;
  existingProvier?: AngularResolvedExistingProvider;
  factoryProvider?: AngularResolvedFactoryProvider;
  otherProvider?: any;
}

export interface AngularResolvedValueProvider {
  provide: ReferenceReflection;
  multi?: string;
  useValue: any;
}

export interface AngularResolvedClassProvider {
  provide: ReferenceReflection;
  multi?: string;
  useClass: ReferenceReflection;
}

export interface AngularResolvedConstructorProvider {
  provide: ReferenceReflection;
  multi?: string;
  deps?: Array<any>;
}

export interface AngularResolvedExistingProvider {
  provide: ReferenceReflection;
  multi?: string;
  useExisting: ReferenceReflection;
}

export interface AngularResolvedFactoryProvider {
  provide: ReferenceReflection;
  multi?: string;
  useFactory: ReferenceReflection;
  deps?: Array<any>;
}
