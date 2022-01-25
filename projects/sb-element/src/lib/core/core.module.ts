import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorInputDirective } from './style-input/color-input.directive';
import { ThemeColorInputDirective } from './style-input/theme-color-input.directive';
import { SizeInputDirective } from './style-input/size-input.directive';
import { SizeColorInputDirective } from './style-input/size-color-input.directive';
import { SizeThemeColorInputDirective } from './style-input/size-theme-color-input.directive';
import { ControlValueAccessorBaseDirective } from './control-value-accessor/control-value-accessor.base.directive';
import { ClassNameInputDirective } from './style-input/class-name-input.directive';
import { ThemeInputDirective } from './style-input/theme-input.directive';
import { ControlValueAccessorClassNameInputDirective } from './control-value-accessor-style-input/control-value-accessor-class-name-input.directive';
import { ControlValueAccessorThemeColorInputDirective } from './control-value-accessor-style-input/control-value-accessor-theme-color-input.directive';
import { ControlValueAccessorColorInputDirective } from './control-value-accessor-style-input/control-value-accessor-color-input.directive';
import { ControlValueAccessorSizeInputDirective } from './control-value-accessor-style-input/control-value-accessor-size-input.directive';
import { ControlValueAccessorSizeColorInputDirective } from './control-value-accessor-style-input/control-value-accessor-size-color-input.directive';
import { ControlValueAccessorSizeThemeColorInputDirective } from './control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive';
import { SizeThemeInputDirective } from './style-input/size-theme-input.directive';
import { StateManagerDirective } from './control-value-accessor/state-manager.directive';
import { EventManagerDirective } from './control-value-accessor/event-manager.directive';
import { TriggerDirective } from './trigger/trigger.directive';
import { ClickTriggerDirective } from './trigger/click-trigger.directive';
import { AlignDirective } from './align/align.directive';
import { HoverTriggerDirective } from './trigger/hover-trigger.directive';



@NgModule({
  declarations: [
    ControlValueAccessorBaseDirective,

    ColorInputDirective,
    ThemeColorInputDirective,
    SizeInputDirective,
    SizeColorInputDirective,
    SizeThemeColorInputDirective,
    ThemeInputDirective,
    SizeThemeInputDirective,
    ClassNameInputDirective,

    ControlValueAccessorColorInputDirective,
    ControlValueAccessorThemeColorInputDirective,
    ControlValueAccessorSizeInputDirective,
    ControlValueAccessorSizeColorInputDirective,
    ControlValueAccessorSizeThemeColorInputDirective,
    ControlValueAccessorClassNameInputDirective,
    StateManagerDirective,
    EventManagerDirective,
    TriggerDirective,
    ClickTriggerDirective,
    HoverTriggerDirective,
    AlignDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ControlValueAccessorBaseDirective,

    ColorInputDirective,
    ThemeColorInputDirective,
    SizeInputDirective,
    SizeColorInputDirective,
    SizeThemeColorInputDirective,
    ThemeInputDirective,
    SizeThemeInputDirective,
    ClassNameInputDirective,

    ControlValueAccessorColorInputDirective,
    ControlValueAccessorThemeColorInputDirective,
    ControlValueAccessorSizeInputDirective,
    ControlValueAccessorSizeColorInputDirective,
    ControlValueAccessorSizeThemeColorInputDirective,
    ControlValueAccessorClassNameInputDirective,

    TriggerDirective,
    ClickTriggerDirective,
    HoverTriggerDirective,
    AlignDirective,
  ]
})
export class CoreModule { }
