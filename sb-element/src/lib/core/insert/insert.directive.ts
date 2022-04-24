import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[sbInsert]'
})
export class SbInsertDirective {

  @Input('sbInsert')
  @HostBinding('innerHTML')
  public innerHTML?: string;

}
