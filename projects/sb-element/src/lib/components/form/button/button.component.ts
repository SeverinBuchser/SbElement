import { Attribute, Component, Input, Optional, ViewEncapsulation } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { SizeThemeColorInputDirective } from '../../../core/style-input/size-theme-color-input.directive';

/**
 * The button component acts like a normal html button, but provides different
 * style options in the form of inputs or attributes.
 *
 * There are two possible form changing options: `round` and `pill`. These can
 * be passed on either with attributes or with inputs. The input syntax is
 * different than the attribute syntax:
 *
 * - `round` or `pill` for attribute syntax and
 * - `[isPill]="{boolean}"` or `[isRound]="{boolean}"` for the input syntax.
 *
 * You cannot combine the two. Only one of these can be set to `ture`.
 *
 * The other input / attribute is `isPlain`/`plain`. This tells the component
 * to invert its colors, which means, that the hover colors are now 'normal'
 * colors and the 'normal' colors are now the hover colors.
 *
 * @example
 * // Basic usage example where pill is set:
 * <sb-button
 *              type="submit"
 *              pill
 *              plain
 *              [disabled]="false">
 *              Button Text
 * </sb-button>
 *
 * @example
 * // Basic usage example where round is set:
 * <sb-button
 *               type="submit"
 *               round
 *               [disabled]="false">
 *               Button Text
 * </sb-button>
 *
 * @example
 * // This is a minimal usage example:
 * <sb-button>
 *                Button Text
 * </sb-button>
 *
 */
@Component({
  selector: 'sb-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent extends SizeThemeColorInputDirective {

  /**
   * The root class of the HTML button element.
   */
  public rootClass: string = 'sb-btn';

  /**
   *  Sets the [round]{@link #round} property of the component.
   *
   * @param {boolean} isRound The new value of the `round` state
   */
  @Input()
  set isRound(isRound: boolean) {
    if (!this.pill) this.round = isRound;
    else if (isRound && this.pill) throw new Error('Cannot use pill and round'
      + ' attribute simultaneously!');
  }

  /**
   *  Sets the [pill]{@link #pill} property of the component.
   *
   * @param {boolean} isPill The new value of `pill`
   */
  @Input()
  set isPill(isPill: boolean) {
    if (!this.round) this.pill = isPill;
    else if (isPill && this.round) throw new Error('Cannot use pill and round'
      + ' attribute simultaneously!');
  }

  /**
   *  Sets the [plain]{@link #plain} property of the component.
   *
   * @param {boolean} isPlain The new value of the `plain` state
   */
  @Input()
  set isPlain(isPlain: boolean) {
    this.plain = isPlain;
  }

  /**
   *  Sets the [disabled]{@link disabled} state of the component.
   *
   * @param {boolean} isDisabled The new value of the `disabled` state
   */
  @Input()
  set disabled(isDisabled: boolean) { this._disabled = isDisabled; }
  /**
   * Gets the [disabled]{@link disabled} state of the component.
   *
   * @returns {boolean} The current [disabled]{@link disabled} state of the
   * component
   */
  get disabled(): boolean { return this._disabled; }

  /**
   * Defines the type of the button element.
   */
  @Input()
  public type: string = 'button';

  /**
   * Defines the text which the button shows, this can either be set via the
   * text input or the content of the button.
   */
  @Input()
  public text: string = '';

  /**
   * Round state of the component.
   *
   * If `true`, the `round` class gets added to the classes of the HTML
   * button element.
   */
  private round: boolean = false;

  /**
   * Pill state of the component.
   *
   * If `true`, the `pill` class gets added to the classes of the HTML
   * button element.
   */
  private pill: boolean = false;

  /**
   * Plain state of the component.
   *
   * If `true`, the `plain` class gets added to the classes of the HTML
   * button element.
   */
  private plain: boolean = false;

  /**
   * Round state of the component.
   *
   * If `true`, the HTML button element gets disabled and is no longer
   * clickable.
   */
  private _disabled: boolean = false;

  /**
   * Creates a new ButtonComponent.
   *
   * Sets the different class states according to the attribute inputs.
   *
   * @param{any} round Any value can be set and the `round` class will be set
   * @param{any} pill Any value can be set and the `pill` class will be set
   * @param{any} plain Any value can be set and the `plain` class will be set
   * @param{ThemeService} themeService Injectable for the
   * `SizeThemeColorInputDirective`
   */
  constructor(
    @Optional() @Attribute('round') round: any,
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('plain') plain: any,
    themeService: ThemeService
  ) {
    super(themeService);
    if (round == '') this.isRound = true;
    if (pill == '') this.isPill = true;
    if (plain == '') this.isPlain = true;
  }

  /**
   *  Provides access for a `FormGroup` to set the disabled state.
   *
   * @param{boolean} isDisabled The new disabled state
   */
  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Adds the needed classes based on the options of the component passed either
   * by input or by attributes.
   *
   * Overwrites the [getClasses]{@link SizeThemeColorInputDirective#getClasses}
   * method of the {@link SizeThemeColorInputDirective} by adding the `pill`,
   * `round` and `plain` classes if needed.
   *
   * The `pill` class gets included, if the [pill]{@link #pill} property
   * is `true`.
   * The `round` class gets included, if the [round]{@link #round} property
   * is `true`.
   * The `plain` class gets included, if the [plain]{@link #plain} property
   * is `true`.
   *
   * @returns {Array<string>} The classes for the HTML button element
   */
  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.round ? 'round' : '');
    classes.push(this.pill ? 'pill' : '');
    classes.push(this.plain ? 'plain' : '');
    return classes;
  }

}
