import { Component } from '@angular/core';
import { BaseColorSizeInputComponent } from '../base/base-color-size-input/base-color-size-input.component';

@Component({
  selector: 'sb-el-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent extends BaseColorSizeInputComponent {

  ngOnInit(): void {
  }

  get iconClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push('sb-icon');
    classes.push(this.color ? 'icon--' + this.color : '');
    classes.push('icon--' + this.size);
    return classes;
  }
}
