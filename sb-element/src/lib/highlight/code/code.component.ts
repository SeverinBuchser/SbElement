import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { mixinClassName } from '../../core';
import { SbHighlightService } from '../highlight.service';

const SbCodeCore = mixinClassName(
  class {
    constructor(public _elementRef: ElementRef) {}
  }, 'sb-code'
);

@Component({
  selector: 'sb-code',
  templateUrl: './code.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SbCodeComponent extends SbCodeCore {

  public innerHTML: string = '';

  private _copy: boolean = true;

  get copy(): boolean {
    return this._copy;
  }

  @Input('copy')
  set isCopy(isCopy: boolean | string) {
    if (typeof isCopy == 'string') this._copy = true;
    else this._copy = isCopy;
  }

  private _code: string = '';
  @Input()
  set code(code: string) {
    this._code = code;
    this.innerHTML = this.highlightService.highlight(this._code, this.language).value;
  }
  get code(): string {
    return this._code;
  }

  @Input()
  public language: string = '';

  constructor(
    elementRef: ElementRef,
    private highlightService: SbHighlightService,
    private clipboard: Clipboard
  ) {
    super(elementRef);
  }

  public handleCopy(): void {
    this.clipboard.copy(this.code);
  }

}
