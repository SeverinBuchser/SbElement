import { mixinFocus } from './focus';

describe('MixinFocus', () => {
  it('should augment an existing class with a disabled property', () => {
    const classWithFocus = mixinFocus(class {});
    const instance = new classWithFocus();

    expect(instance.focused)
      .withContext('Expected the mixed-into class to have a focused property')
      .toBeFalsy();

    instance.focused = true;

    expect(instance.focused)
      .withContext('Expected the mixed-into class to have an updated focused property')
      .toBe(true);

    instance.setFocusedState(false);

    expect(instance.focused)
      .withContext('Expected the mixed-into class to have an updated focused property')
      .toBe(false);
  });

  it('should fire focus and blur events', () => {
    const classWithFocus = mixinFocus(class {});
    const instance = new classWithFocus();
    spyOn(instance.focus, 'emit');
    spyOn(instance.blur, 'emit');

    instance.focused = true;

    expect(instance.focus.emit)
      .withContext('Expected the focus event to fire when focused is set')
      .toHaveBeenCalledOnceWith()

    instance.focused = false;

    expect(instance.blur.emit)
      .withContext('Expected the blur event to fire when focused is unset')
      .toHaveBeenCalledOnceWith()
  })
});
