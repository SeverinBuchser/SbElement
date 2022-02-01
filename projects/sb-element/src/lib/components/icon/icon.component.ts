import { Attribute, Component, Input, Optional, ViewEncapsulation } from '@angular/core';
import { SizeColorInputDirective } from '../../core/style-input/size-color-input.directive';

@Component({
  selector: 'sb-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IconComponent extends SizeColorInputDirective {

  public rootClass = 'sb-icon';

  @Input()
  public icon: string = '';

  @Input()
  set isOutline(isOutline: boolean) {
    this.outline = isOutline;
  }

  private outline: boolean = false;

  constructor(@Optional() @Attribute('outline') outline: any) {
    super();
    if (outline == '') this.isOutline = true;
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.outline ? 'outline' : '');
    return classes;
  }

}
