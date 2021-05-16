import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[selector]'
})
export class SizeColorInputDirective {

    public rootClass: string = '';

    @Input()
    public size: string | null = 'd';

    @Input()
    public color: string | null = 'primary';

    public getClasses(): Array<string> {
      let classes = new Array<string>();
      classes.push(this.rootClass);
      classes.push(this.size ? this.rootClass + '--' + this.size : '');
      classes.push(this.color ? this.rootClass + '--' + this.color : '');
      return classes;
    }

}
