import { Attribute, Component, Input, Optional } from '@angular/core';
import { SizeColorInputDirective } from '../base/style-input/size-color-input.directive';

@Component({
  selector: 'sb-el-icon',
  templateUrl: './icon.component.html'
})
export class IconComponent extends SizeColorInputDirective {

  @Input()
  public icon: string = '';

  @Input()
  set isOutline(isOutline: boolean) {
    this.outline = isOutline;
  }

  private outline: boolean = false;

  constructor(@Optional() @Attribute('outline') outline: any) {
    super();
    this.rootClass = 'sb-el-icon';
    if (outline === '') this.isOutline = true;
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.outline ? 'outline' : '');
    return classes;
  }

}
