import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[selector]'
})
export class SizeInputDirective {

  public rootClass: string = '';

  @Input()
  public size: string | null = 'd';

  public getClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push(this.rootClass);
    classes.push(this.size ? this.rootClass + '--' + this.size : '');
    return classes;
  }

}
