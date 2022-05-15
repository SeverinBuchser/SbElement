import { mixinRound } from './round';
import { ElementRef } from '@angular/core';

describe('MixinRound', () => {
  it('should augment an existing class with a round property', () => {
    const classWithRound = mixinRound(TestClass);
    const instance = new classWithRound();

    expect(instance.round)
      .withContext('Expected the mixed-into class to have a round property')
      .toBeFalsy();

    instance.isRound = true;

    expect(instance.round)
      .withContext('Expected the mixed-into class to have an updated round property')
      .toBe(true);
  });

  it('should remove old round class if round property changes', () => {
    const classWithRound = mixinRound(TestClass);
    const instance = new classWithRound();

    expect(instance.testElement.classList.length)
      .withContext('Expected the element to not have any classes at initialization')
      .toBe(0);

    instance.isRound = true;

    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "round" class set')
      .toContain('round');

    instance.isRound = false;

    expect(instance.testElement.classList)
      .withContext('Expected the element to no longer have "round" set.')
      .not.toContain('round');

		instance.isRound = 'foo';

    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "round" class set')
      .toContain('round');
  });

  it('should allow inital round if set', () => {
    const classWithRound = mixinRound(TestClass, true);
    const instance = new classWithRound();

    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "round" class on init.')
      .toContain('round');
  });
});

class TestClass {
  testElement: HTMLElement = document.createElement('div');

  /** Fake instance of an ElementRef. */
  _elementRef = new ElementRef<HTMLElement>(this.testElement);
}
