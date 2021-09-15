import { Component, ElementRef, ViewChild } from '@angular/core';
import { ThemeInputDirective } from "sb-element";

@Component({
  selector: 'sb',
  templateUrl: './sb.component.html',
  styleUrls: ['./sb.component.scss']
})
export class SBComponent extends ThemeInputDirective {

  public rootClass: string = 'home-logo';

  private scrolled: number = 0;
  private scrolledPercentage: number = 0;
  private minScroll: number = 0;
  private maxScroll: number = 20;

  public toAnimateClass: string = 'closed';

  @ViewChild('toAnimate')
  public toAnimate!: ElementRef;

  @ViewChild('toAnimateBackside')
  public toAnimateBackside!: ElementRef;

  onScroll(event: WheelEvent) {
    if ((this.scrolled > this.minScroll || event.deltaY >= 0)
     && (this.scrolled < this.maxScroll || event.deltaY <= 0)) {
      this.scrolled += event.deltaY / Math.abs(event.deltaY);
    }
    this.scrolledPercentage = this.scrolled / (this.maxScroll - this.minScroll);
    this.toAnimate.nativeElement.style.transform = 'rotate3d(1, 0, 0, ' + 180 * this.scrolledPercentage + 'deg)'
    this.toAnimateBackside.nativeElement.style.transform = 'rotate3d(1, 0, 0, ' + 180 * this.scrolledPercentage + 'deg)'
    if (this.scrolledPercentage > 0.45) {
      this.toAnimate.nativeElement.style.zIndex = -1;
      this.toAnimateBackside.nativeElement.style.zIndex = 1;
    } else {
      this.toAnimate.nativeElement.style.zIndex = 1;
      this.toAnimateBackside.nativeElement.style.zIndex = -1;
    }
  }

}
