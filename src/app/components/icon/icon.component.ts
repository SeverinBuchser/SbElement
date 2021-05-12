import { Component } from '@angular/core';
import { BaseColorSizeInputDirective } from '../base/base-color-size-input/base-color-size-input.directive';

@Component({
  selector: 'sb-el-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent extends BaseColorSizeInputDirective {

  ngOnInit(): void {
  }

  get iconClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push('sb-icon');
    classes.push(this.color ? 'icon--' + this.color : '');
    classes.push(this.size ? 'icon--' + this.size : '');
    return classes;
  }
}
