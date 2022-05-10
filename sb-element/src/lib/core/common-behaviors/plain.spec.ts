import { mixinPlain } from './plain';
import { ElementRef } from '@angular/core';

describe('MixinPlain', () => {
  it('should augment an existing class with a plain property', () => {
    const classWithPlain = mixinPlain(TestClass);
    const instance = new classWithPlain();

    expect(instance.plain)
      .withContext('Expected the mixed-into class to have a plain property')
      .toBeFalsy();

    instance.isPlain = true;

    expect(instance.plain)
      .withContext('Expected the mixed-into class to have an updated plain property')
      .toBe(true);
  });

  it('should remove old plain class if plain property changes', () => {
    const classWithPlain = mixinPlain(TestClass);
    const instance = new classWithPlain();

    expect(instance.testElement.classList.length)
      .withContext('Expected the element to not have any classes at initialization')
      .toBe(0);

    instance.isPlain = true;

    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "plain" class set')
      .toContain('plain');

    instance.isPlain = false;

    expect(instance.testElement.classList).not.toContain(
      'plain',
      'Expected the element to no longer have "plain" set.',
    );

		instance.isPlain = 'foo';

    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "plain" class set')
      .toContain('plain');
  });

  it('should allow inital plain if set', () => {
    const classWithPlain = mixinPlain(TestClass, true);
    const instance = new classWithPlain();

    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "plain" class on init.')
      .toContain('plain');
  });
});

class TestClass {
  testElement: HTMLElement = document.createElement('div');

  /** Fake instance of an ElementRef. */
  _elementRef = new ElementRef<HTMLElement>(this.testElement);
}
