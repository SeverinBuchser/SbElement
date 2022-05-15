import { mixinTabindex } from './tabindex';
import { ElementRef } from '@angular/core';

describe('MixinTabindex', () => {
  it('should augment an existing class with a tabindex property', () => {
    const classWithTabindex = mixinTabindex(TestClass);
    const instance = new classWithTabindex();

    expect(instance.tabindex)
      .withContext('Expected the mixed-into class to have a tabindex property')
      .toBe(-1);

    instance.tabindex = 0;

    expect(instance.tabindex)
      .withContext('Expected the mixed-into class to have an updated tabindex property')
      .toBe(0);
  });

  it('should remove old tabIndex if new tabindex property is set', () => {
    const classWithTabindex = mixinTabindex(TestClass);
    const instance = new classWithTabindex();

    expect(instance.testElement.tabIndex)
      .withContext('Expected the element to not have a tabIndex at initialization')
      .toBe(-1);

    instance.tabindex = 1;

    expect(instance.testElement.tabIndex)
      .withContext('Expected the element to have a tabIndex of "1" set')
      .toBe(1);

    instance.tabindex = 2;

    expect(instance.testElement.tabIndex)
      .withContext('Expected the element to no longer have a tabIndex of "1" set.')
      .not.toBe(1);
    expect(instance.testElement.tabIndex)
      .withContext('Expected the element to have a tabIndex of "2" set')
      .toBe(2);
  });

  it('should allow having no tabIndex set', () => {
    const classWithTabindex = mixinTabindex(TestClass);
    const instance = new classWithTabindex();

    expect(instance.testElement.tabIndex)
      .withContext('Expected the element to not have a tabIndex at initialization')
      .toBe(-1);

    instance.tabindex = 1;

    expect(instance.testElement.tabIndex)
      .withContext('Expected the element to have a tabIndex of "1" set')
      .toBe(1);

    instance.tabindex = undefined;

    expect(instance.testElement.tabIndex)
      .withContext('Expected the element to have no tabIndex set.')
      .toBe(-1);
  });

  it('should allow having a default tabIndex if specified', () => {
    const classWithTabindex = mixinTabindex(TestClass, 1);
    const instance = new classWithTabindex();

    expect(instance.testElement.tabIndex)
      .withContext('Expected the element to have a tabIndex of "1" by default.')
      .toBe(1);

    instance.tabindex = undefined;

    expect(instance.testElement.tabIndex)
      .withContext('Expected the default tabIndex "1" to be set.')
      .toBe(1)
  });

  it('should allow for the default tabindex to change after init', () => {
    const classWithTabindex = mixinTabindex(TestClass, 1);
    const instance = new classWithTabindex();

    expect(instance.testElement.tabIndex).toBe(1);

    instance.defaultTabindex = 2;
    instance.tabindex = undefined;

    expect(instance.testElement.tabIndex).toBe(2);
  });
});
class TestClass {
  testElement: HTMLElement = document.createElement('div');

  /** Fake instance of an ElementRef. */
  _elementRef = new ElementRef<HTMLElement>(this.testElement);
}
