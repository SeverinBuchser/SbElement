import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../base/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive';

@Component({
  selector: 'sb-el-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SliderComponent,
    multi: true
  }]
})
export class SliderComponent extends ControlValueAccessorSizeThemeColorInputDirective<number> {

  @Input()
  public label: string = '';

  @Input()
  public max: number = 10;

  @Input()
  public min: number = 0;

  @Input()
  public step: number = 1;

  @Input()
  public snapTo: Array<number> = [];

  @Input()
  public showValue: boolean = false;

  constructor() {
    super();
    this.rootClass = 'sb-el-slider';
  }

  ngOnInit(): void {
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.label ? 'is-label' : '');
    classes.push(this.showValue ? 'is-value' : 'is-not-value');
    return classes;
  }

}
