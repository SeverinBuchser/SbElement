import { ElementRef } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { mixinHide, padding } from './hide';

describe('MixinHide', () => {
  it('should augment an existing class with a visible property', () => {
    const classWithHide = mixinHide(TestClass);
    const instance = new classWithHide();

    expect(instance.transitionElement)
      .withContext('Expected the mixed-into class to have a default transitionElement')
      .toBe(instance._elementRef);

    expect(instance.visible)
      .withContext('Expected the mixed-into class to have a visible property')
      .toBeFalsy();

    instance.visible = true;

    expect(instance.visible)
      .withContext('Expected the mixed-into class to have an updated visible property')
      .toBe(true);

    instance.setVisibleState(false);

    expect(instance.visible)
      .withContext('Expected the mixed-into class to have an updated visible property')
      .toBe(false);
  });

  it('should fire animation timing events', fakeAsync(() => {
    const classWithHide = mixinHide(TestClass);
    const instance = new classWithHide();
    const transitionDuration = 2000;

    spyOnProperty(instance, 'transitionDuration', 'get')
      .and.returnValue(transitionDuration);

    spyOn(instance.showStart, 'emit');
    spyOn(instance.showEnd, 'emit');
    spyOn(instance.hideStart, 'emit');
    spyOn(instance.hideEnd, 'emit');

    instance.visible = true;

    tick(padding)

    expect(instance.showStart.emit)
      .withContext('Expected the showStart event to fire when visible is set')
      .toHaveBeenCalledOnceWith()

    tick(padding + transitionDuration)

    expect(instance.showEnd.emit)
      .withContext('Expected the showEnd event to fire when visible is set')
      .toHaveBeenCalledOnceWith()

    instance.visible = false;

    expect(instance.hideStart.emit)
      .withContext('Expected the hideStart event to fire when visible is unset')
      .toHaveBeenCalledOnceWith()

    tick(padding + transitionDuration)

    expect(instance.hideEnd.emit)
      .withContext('Expected the hideEnd event to fire when visible is unset')
      .toHaveBeenCalledOnceWith()
  }))

  it('should alter animation classes', fakeAsync(() => {
    const classWithHide = mixinHide(TestClass);
    const instance = new classWithHide();
    const transitionDuration = 2000;
    const classList = instance._elementRef.nativeElement.classList;

    spyOnProperty(instance, 'transitionDuration', 'get')
      .and.returnValue(transitionDuration);

    // showing
    instance.visible = true;

    expect(classList)
      .withContext('Expected the className not to have "sb--hidden" when showing')
      .not.toContain('sb--hidden')

    expect(classList)
      .withContext('Expected the className to have "sb--visibly-hidden" before animating when showing')
      .toContain('sb--visibly-hidden')

    tick(padding)

    expect(classList)
      .withContext('Expected the className to have "sb--visible" while animating when showing')
      .toContain('sb--visible')

    tick(padding + transitionDuration)

    expect(classList)
      .withContext('Expected the className to have "sb--visible" after animating when showing')
      .toContain('sb--visible')

    // hiding
    instance.visible = false;

    expect(classList)
      .withContext('Expected the className not to have "sb--visible" when hiding')
      .not.toContain('sb--visible')

    expect(classList)
      .withContext('Expected the className to have "sb--visibly-hidden" before animating when hiding')
      .toContain('sb--visibly-hidden')

    tick(padding + transitionDuration)

    expect(classList)
      .withContext('Expected the className to have "sb--hidden" after animating when hiding')
      .toContain('sb--hidden')
  }))
});

class TestClass {
  testElement: HTMLElement = document.createElement('div');

  /** Fake instance of an ElementRef. */
  _elementRef = new ElementRef<HTMLElement>(this.testElement);
}
