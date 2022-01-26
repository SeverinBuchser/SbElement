import { Attribute, Component, Input, Optional } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AlertService } from '../../../services/alert/alert.service';
import { ThemeService } from '../../../services/theme/theme.service';
import { ControlValueAccessorSizeThemeColorInputDirective } from '../../../core/control-value-accessor-style-input/control-value-accessor-size-theme-color-input.directive';

@Component({
  selector: 'sb-file-input',
  templateUrl: './file-input.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FileInputComponent,
    multi: true
  }]
})
export class FileInputComponent extends ControlValueAccessorSizeThemeColorInputDirective<File> {

  public rootClass = 'sb-file-input';

  @Input()
  public placeholder: string = '';

  // the limit is in mega bytes
  @Input()
  public limit: number = -1;

  public plain: boolean = false;
  public pill: boolean = false;

  private static defaultMessage: string = 'Choose a file';
  public message: string = FileInputComponent.defaultMessage;

  constructor(
    private alertService: AlertService,
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
      if (file && this.checkFileSize(file)) {
        this.message = file.name;
        this.writeValueInnerChange(file);
      } else {
        this.message = FileInputComponent.defaultMessage;
        this.writeValueInnerChange(undefined);
      }
    }
  }

  private checkFileSize(file: File): boolean {
    if (this.limit >= 0) {
      if (file.size <= this.limit * 1000000) return true;
      else {
        this.alertService.warn("The file is too big, the maximum file size is " + this.limit + ' MB!');
        return false
      }
    } else return true;
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.pill ? 'pill' : '');
    classes.push(this.plain ? 'plain' : '');
    return classes;
  }
}
