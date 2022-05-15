import { Size, mixinSize } from './size';
import { ElementRef } from '@angular/core';

describe('MixinSize', () => {
  it('should augment an existing class with a size property', () => {
    const classWithSize = mixinSize(TestClass);
    const instance = new classWithSize();

    expect(instance.size)
      .withContext('Expected the mixed-into class to have a size property')
      .toBeFalsy();

    instance.size = Size.MEDIUM;

    expect(instance.size)
      .withContext('Expected the mixed-into class to have an updated size property')
      .toBe(Size.MEDIUM);
  });

  it('should remove old size classes if new size is set', () => {
    const classWithSize = mixinSize(TestClass);
    const instance = new classWithSize();

    expect(instance.testElement.classList.length)
      .withContext('Expected the element to not have any classes at initialization')
      .toBe(0);

    instance.size = Size.MEDIUM;

    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "sb--m" class set')
      .toContain('sb--m');

    instance.size = Size.LARGE;

    expect(instance.testElement.classList)
      .withContext('Expected the element to no longer have "sb--m" set.')
      .not.toContain('sb--m');
    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "sb--l" class set')
      .toContain('sb--l');
  });

  it('should allow having no size set', () => {
    const classWithSize = mixinSize(TestClass);
    const instance = new classWithSize();

    expect(instance.testElement.classList.length)
      .withContext('Expected the element to not have any classes at initialization')
      .toBe(0);

    instance.size = Size.MEDIUM;

    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "sb--m" class set')
      .toContain('sb--m');

    instance.size = undefined;

    expect(instance.testElement.classList.length)
      .withContext('Expected the element to have no size class set.')
      .toBe(0);
  });

  it('should allow having a default size if specified', () => {
    const classWithSize = mixinSize(TestClass, Size.MEDIUM);
    const instance = new classWithSize();

    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "sb--m" class by default.')
      .toContain('sb--m');

    instance.size = undefined;

    expect(instance.testElement.classList)
      .withContext('Expected the default size "sb--m" to be set.')
      .toContain('sb--m');
  });

  it('should allow for the default size to change after init', () => {
    const classWithSize = mixinSize(TestClass, Size.MEDIUM);
    const instance = new classWithSize();

    expect(instance.testElement.classList).toContain('sb--m');

    instance.defaultSize = Size.LARGE;
    instance.size = undefined;

    expect(instance.testElement.classList).toContain('sb--l');
  });
});
class TestClass {
  testElement: HTMLElement = document.createElement('div');

  /** Fake instance of an ElementRef. */
  _elementRef = new ElementRef<HTMLElement>(this.testElement);
}
