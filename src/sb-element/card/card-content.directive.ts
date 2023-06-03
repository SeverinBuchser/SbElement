import { Directive, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';

@Directive({
  selector: '[sbCardContent]'
})
export class SbCardContentDirective {
  
  @Input()
  public showTopDivider: boolean = false;
  
  get classes(): Array<string> {
    return Array.from(this._elementRef.nativeElement.classList);
  }
  
  @ViewChild(TemplateRef, { static: true })
  public template!: TemplateRef<any>;
  
  constructor(public _elementRef: ElementRef) {}

}