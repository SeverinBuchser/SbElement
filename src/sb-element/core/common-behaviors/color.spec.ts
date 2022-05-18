import { Color, mixinColor } from './color';
import { ElementRef } from '@angular/core';

describe('MixinColor', () => {
  it('should augment an existing class with a color property', () => {
    const classWithColor = mixinColor(TestClass);
    const instance = new classWithColor();

    expect(instance.color)
      .withContext('Expected the mixed-into class to have a color property')
      .toBeFalsy();

    instance.color = Color.PRIMARY;

    expect(instance.color)
      .withContext('Expected the mixed-into class to have an updated color property')
      .toBe(Color.PRIMARY);
  });

  it('should remove old color classes if new color is set', () => {
    const classWithColor = mixinColor(TestClass);
    const instance = new classWithColor();

    expect(instance.testElement.classList.length)
      .withContext('Expected the element to not have any classes at initialization')
      .toBe(0);

    instance.color = Color.PRIMARY;

    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "sb--primary" class set')
      .toContain('sb--primary');

    instance.color = Color.SECONDARY;

    expect(instance.testElement.classList)
      .withContext('Expected the element to no longer have "sb--primary" set.')
      .not.toContain('sb--primary');
    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "sb--secondary" class set')
      .toContain('sb--secondary');
  });

  it('should allow having no color set', () => {
    const classWithColor = mixinColor(TestClass);
    const instance = new classWithColor();

    expect(instance.testElement.classList.length)
      .withContext('Expected the element to not have any classes at initialization')
      .toBe(0);

    instance.color = Color.PRIMARY;

    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "sb--primary" class set')
      .toContain('sb--primary');

    instance.color = undefined;

    expect(instance.testElement.classList.length)
      .withContext('Expected the element to have no color class set.')
      .toBe(0);
  });

  it('should allow having a default color if specified', () => {
    const classWithColor = mixinColor(TestClass, Color.PRIMARY);
    const instance = new classWithColor();

    expect(instance.testElement.classList)
      .withContext('Expected the element to have the "sb--primary" class by default.')
      .toContain('sb--primary');

    instance.color = undefined;

    expect(instance.testElement.classList)
      .withContext('Expected the default color "sb--primary" to be set.')
      .toContain('sb--primary');
  });

  it('should allow for the default color to change after init', () => {
    const classWithColor = mixinColor(TestClass, Color.PRIMARY);
    const instance = new classWithColor();

    expect(instance.testElement.classList).toContain('sb--primary');

    instance.defaultColor = Color.SECONDARY;
    instance.color = undefined;

    expect(instance.testElement.classList).toContain('sb--secondary');
  });
});
class TestClass {
  testElement: HTMLElement = document.createElement('div');

  /** Fake instance of an ElementRef. */
  _elementRef = new ElementRef<HTMLElement>(this.testElement);
}
