import { mixinPill } from './pill';
import { ElementRef } from '@angular/core';

describe('MixinPill', () => {
  it('should augment an existing class with a pill property', () => {
    const classWithPill = mixinPill(TestClass);
    const instance = new classWithPill();

    expect(instance.pill)
      .withContext('Expected the mixed-into class to have a pill property')
      .toBeFalsy();

    instance.isPill = true;

    expect(instance.pill)
      .withContext('Expected the mixed-into class to have an updated pill property')
      .toBe(true);
  });

  it('should remove old pill class if pill property changes', () => {
    const classWithPill = mixinPill(TestClass);
    const instance = new classWithPill();

    expect(instance.testElement.classList.length)
      .withContext('Expected the element to not have any classes at initialization')
      .toBe(0);

    instance.isPill = true;

    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "pill" class set')
      .toContain('pill');

    instance.isPill = false;

    expect(instance.testElement.classList)
      .withContext('Expected the element to no longer have "pill" set.')
      .not.toContain('pill');

		instance.isPill = 'foo';

    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "pill" class set')
      .toContain('pill');
  });

  it('should allow inital pill if set', () => {
    const classWithPill = mixinPill(TestClass, true);
    const instance = new classWithPill();

    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "pill" class on init.')
      .toContain('pill');
  });
});

class TestClass {
  testElement: HTMLElement = document.createElement('div');

  /** Fake instance of an ElementRef. */
  _elementRef = new ElementRef<HTMLElement>(this.testElement);
}
