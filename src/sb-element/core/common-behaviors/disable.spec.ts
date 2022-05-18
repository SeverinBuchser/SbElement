import { mixinDisable } from './disable';

describe('MixinDisable', () => {
  it('should augment an existing class with a disabled property', () => {
    const classWithDisable = mixinDisable(class {});
    const instance = new classWithDisable();

    expect(instance.disabled)
      .withContext('Expected the mixed-into class to have a disabled property')
      .toBeFalsy();

    instance.disabled = true;

    expect(instance.disabled)
      .withContext('Expected the mixed-into class to have an updated disabled property')
      .toBe(true);

    instance.setDisabledState(false);

    expect(instance.disabled)
      .withContext('Expected the mixed-into class to have an updated disabled property')
      .toBe(false);
  });

  it('should allow inital disabled if set', () => {
    const classWithDisable = mixinDisable(class {}, true);
    const instance = new classWithDisable();

    expect(instance.disabled)
      .withContext('Expected the element to be disabled on init')
      .toBe(true);
  });
});
