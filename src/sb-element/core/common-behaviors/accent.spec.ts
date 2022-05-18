import { mixinAccent } from './accent';
import { ElementRef } from '@angular/core';

describe('MixinAccent', () => {
  it('should augment an existing class with an accent property', () => {
    const classWithAccent = mixinAccent(TestClass);
    const instance = new classWithAccent();

    expect(instance.accent)
      .withContext('Expected the mixed-into class to have an accent property')
      .toBeFalsy();

    instance.isAccent = true;

    expect(instance.accent)
      .withContext('Expected the mixed-into class to have an updated accent property')
      .toBe(true);
  });

  it('should remove old accent class if accent property changes', () => {
    const classWithAccent = mixinAccent(TestClass);
    const instance = new classWithAccent();

    expect(instance.testElement.classList.length)
      .withContext('Expected the element to not have any classes at initialization')
      .toBe(0);

    instance.isAccent = true;

    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "accent" class set')
      .toContain('accent');

    instance.isAccent = false;

    expect(instance.testElement.classList)
      .withContext('Expected the element to no longer have "accent" set.')
      .not.toContain('accent');

		instance.isAccent = 'foo';

    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "accent" class set')
      .toContain('accent');
  });

  it('should allow inital accent if set', () => {
    const classWithAccent = mixinAccent(TestClass, true);
    const instance = new classWithAccent();

    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "accent" class on init.')
      .toContain('accent');
  });
});

class TestClass {
  testElement: HTMLElement = document.createElement('div');

  /** Fake instance of an ElementRef. */
  _elementRef = new ElementRef<HTMLElement>(this.testElement);
}
