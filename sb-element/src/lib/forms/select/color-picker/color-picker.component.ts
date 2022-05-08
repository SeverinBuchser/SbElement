import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  CanClassName,
  CanDisable,
  CanFocus,
  HasElementRef,
  mixinAccent,
  mixinClassName,
  mixinColor,
  mixinPill,
  mixinPlain,
  mixinSize } from '../../../core';
import { SbSelectOneCore } from '../select-core';

const shades = [
  0,
  50,
  100,
  150,
  200,
  250,
  300,
  350,
  400,
  450,
  500,
  550,
  600,
  650,
  700,
  750,
  800,
  850,
  900,
  950,
  1000
];
const paletteNames = [
  'red-saturated',
  'red-desaturated',
  'yellow-saturated',
  'yellow-desaturated',
  'green-saturated',
  'green-desaturated',
  'blue-saturated',
  'blue-desaturated',
  'magenta-saturated',
  'magenta-desaturated'
];

// function getShades(paletteName: string): Array<number> {
//   return palettes.find((palette: string) => {
//     return palette.name == paletteName
//   })?.shades;
// }

const SbColorPickerCore = mixinPill(
  mixinAccent(
    mixinPlain(
      mixinSize(
        mixinColor(
          mixinClassName(SbSelectOneCore, 'sb-color-picker')
        )
      )
    )
  )
);

@Component({
  selector: 'sb-color-picker',
  templateUrl: './color-picker.component.html',
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'isAccent: accent',
    'isPill: pill',
    'isPlain: plain',
    'size',
    'color',
    'disabled'
  ],
  outputs: [
    'blur',
    'focus'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbColorPickerComponent,
    multi: true
  }]
})
export class SbColorPickerComponent extends SbColorPickerCore<string>
  implements CanClassName, CanDisable, CanFocus, ControlValueAccessor, HasElementRef {

  @Input()
  public position: string = 'bottom-center';

  public dim = [
    shades.length,
    paletteNames.length,
  ]

  constructor(elementRef: ElementRef) {
    super(elementRef);
    this.options = paletteNames.map(paletteName => {
      return shades.map(shade => paletteName + '-' + shade)
    }).flat();
  }



	public select(option: string): void {
		if (this.options.includes(option)) {
      super.select(option);
    }
	}

  public writeValue(option: string | undefined): void {
		if (option && this.options.includes(option)) {
      super.writeValue(option);
    }
  }

  public formatOption(option: string | undefined): string {
    if (option) {
      return option.split('-').map(split => split.charAt(0).toUpperCase()
        + split.substring(1)).join(' ');
    }
    return '';
  }

}
