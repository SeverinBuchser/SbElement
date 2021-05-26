import { Component, Input } from '@angular/core';
import { SizeThemeColorInputDirective } from '../../base/style-input/size-theme-color-input.directive';

@Component({
  selector: 'sb-el-form-group',
  templateUrl: './form-group.component.html'
})
export class FormGroupComponent extends SizeThemeColorInputDirective {

  public rootClass = 'sb-el-form-group';

  @Input()
  public groupTitle: string = '';
  get hasGroupTitle(): boolean {
    return this.groupTitle !== '';
  }

  @Input()
  public groupAlign: string | null = 'left';

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.groupAlign ? 'is-' + this.groupAlign : '');
    return classes;
  }

}