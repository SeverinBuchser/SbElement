import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { Color, mixinClassName, mixinColor } from "sb-element";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent extends mixinColor(mixinClassName(class {
  constructor(public _elementRef: ElementRef) {}
}, 'home'), Color.PRIMARY) {

  constructor(
    elementRef: ElementRef,
    public router: Router
  ) {
    super(elementRef);
  }
}
