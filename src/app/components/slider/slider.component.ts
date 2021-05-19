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
  public min: number = 0;

  @Input()
  public max: number = 10;

  private _step: number = 1;
  @Input()
  set step(step: number) {
    this._step = step;
    if (Math.floor(step) !== step)
        this.decimalPlaces = step.toString().split(".")[1].length || 0;
  }
  get step(): number { return this._step }
  private decimalPlaces: number = 0;

  @Input()
  set snap(snap: Array<number> | boolean) {
    if (Array.isArray(snap)) this.snapPoints = snap;
    else if (snap) {
      this.snapPoints = new Array<number>();
      let snapStep = Math.round((this.max-this.min)/5/this.step)*this.step;
      let sum = this.min;
      while(sum < this.max - snapStep) {
        this.snapPoints.push(sum)
        sum += snapStep;
      }
    }
  }
  public snapPoints: Array<number> = new Array<number>();

  get numberPipingValue(): string {
    return '1.' + this.decimalPlaces + '-' + this.decimalPlaces;
  }

  @Input()
  public showValue: boolean = false;

  @Input()
  public valueSuffix: string = '';

  constructor() {
    super();
    this.rootClass = 'sb-el-slider';
  }

  ngOnInit(): void {
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.label ? 'is-label' : 'is-not-label');
    classes.push(this.showValue ? 'is-value' : 'is-not-value');
    return classes;
  }

}
