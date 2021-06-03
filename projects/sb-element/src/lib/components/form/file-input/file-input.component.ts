import { Attribute, Component, Input, Optional } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeService } from '../../../services/theme/theme.service';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../base/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive';

@Component({
  selector: 'sb-el-file-input',
  templateUrl: './file-input.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FileInputComponent,
    multi: true
  }]
})
export class FileInputComponent extends ControlValueAccessorSizeThemeColorInputDirective<File> {

  public rootClass = 'sb-el-file-input';

  @Input()
  public placeholder: string = '';

  public plain: boolean = false;
  public pill: boolean = false;

  constructor(
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('plain') plain: any,
    themeService: ThemeService
  ) {
    super(themeService);
    if (pill === '') this.pill = true;
    if (plain === '') this.plain = true;
  }

  public input(files: FileList | null) {
    if (files) {
      let file: File | null = files.item(0);
      if (file) {
        this.writeValueInnerChange(file);
      }
    }
  }
}
