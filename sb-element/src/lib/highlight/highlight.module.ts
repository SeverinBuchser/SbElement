import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard'
import { SbCoreModule } from '../core';
import { SbFormsModule } from '../forms';
import { SbIconModule } from '../icon';
import { SbPopperModule } from '../popper';

import { SbCodeComponent } from './code';
import { SbHighlightLanguage } from './highlight-language';
import { SB_HIGHLIGHT_OPTIONS } from './highlight-options';

@NgModule({
  declarations: [SbCodeComponent],
  imports: [
    CommonModule,
    SbCoreModule,
    SbIconModule,
    SbFormsModule,
    SbPopperModule,
    ClipboardModule
  ],
  exports: [SbCodeComponent]
})
export class SbHighlightModule {
  constructor(@Optional() @SkipSelf() parentModule?: SbHighlightModule) {
    if (parentModule) {
      throw new Error(
        'HighlightModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(languages: Array<SbHighlightLanguage>): ModuleWithProviders<SbHighlightModule> {
    return {
      ngModule: SbHighlightModule,
      providers: [
        { provide: SB_HIGHLIGHT_OPTIONS, useValue: { languages } }
      ]
    }
  }
}
