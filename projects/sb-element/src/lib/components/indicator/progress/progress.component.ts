import { Attribute, Component, ElementRef, Input, Optional, ViewEncapsulation } from '@angular/core';
import { Color, mixinClassName, mixinColor, mixinDisable, mixinSize, mixinTheme, SbThemeService, Size } from "../../../core";

const SbProgressCore = mixinDisable(
  mixinSize(
    mixinColor(
      mixinTheme(
        mixinClassName(
          class {
            constructor(
              public _elementRef: ElementRef,
              public _themeService: SbThemeService) {}
          }, 'sb-progress'
        )
      ), Color.PRIMARY
    ), Size.DEFAULT
  )
);

@Component({
  selector: 'sb-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.pill]': 'pill',
    '[class.outline]': 'outline',
    '[class.striped]': 'striped && size != "xs"',
    '[class.animated]': 'animateStripes && striped'
  },
  inputs: [
    'size',
    'color',
    'disabled'
  ]
})
export class SbProgressComponent extends SbProgressCore {

  @Input()
  public progress: number = 0;

  get progressPercentage(): string {
    return `${this.progress}%`;
  }

  @Input()
  public showPercentage: boolean = false;

  @Input()
  public animateStripes: boolean = false;

  @Input()
  set isPill(isPill: boolean) { this.pill = isPill; }
  @Input()
  set isOutline(isOutline: boolean) { this.outline = isOutline; }
  @Input()
  set isStriped(isStriped: boolean) { this.striped = isStriped; }

  private pill: boolean = false;
  private outline: boolean = false;
  private striped: boolean = false;

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService,
    @Optional() @Attribute('pill') isPill: any,
    @Optional() @Attribute('outline') isOutline: any,
    @Optional() @Attribute('striped') isStriped: any,
  ) {
    super(elementRef, themeService);
    if (isPill == '') this.isPill = true;
    if (isOutline == '') this.isOutline = true;
    if (isStriped == '') this.isStriped = true;
  }

}
