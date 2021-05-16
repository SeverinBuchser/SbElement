import { Directive, Input } from '@angular/core';
import { ControlValueAccessorBase } from './control-value-accessor.base.directive';

@Directive({
  selector: '[selector]'
})
export class FormGroupBase<ValueType> extends ControlValueAccessorBase<ValueType> {

  @Input()
  public groupTitle: string = '';
  get hasGroupTitle(): boolean {
    return this.groupTitle !== '';
  }

  public rootClass: string = 'sb-el-form-group';

  @Input()
  public size: string | null = 'd';

  @Input()
  public theme: string | null = 'light';

  @Input()
  public color: string | null = 'primary';

  public getClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push(this.rootClass);
    classes.push(this.size ? this.rootClass + '--' + this.size : '');
    classes.push(this.theme && this.color ? this.rootClass + '--' + this.theme + '-' + this.color : '');
    return classes;
  }

}
