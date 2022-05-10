import { mixinClassName } from './class-name';
import { ElementRef } from '@angular/core';

describe('MixinClassName', () => {
  it('should augment an existing class with a className property', () => {
    const classWithClassName = mixinClassName(TestClass, 'some-class');
    const instance = new classWithClassName();

    expect(instance.className)
      .withContext('Expected the mixed-into class to have "some-class" as className')
      .toEqual('some-class');
  });

  it('should not allow to augment class with invalid className', () => {
    expect(() => mixinClassName(TestClass, ''))
      .withContext('Expected the mixin to fail with invalid className')
      .toThrow(new Error(`The className '' is invalid!`))
  });
});

class TestClass {
  testElement: HTMLElement = document.createElement('div');

  /** Fake instance of an ElementRef. */
  _elementRef = new ElementRef<HTMLElement>(this.testElement);
}
