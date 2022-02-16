import { Attribute, Component, HostBinding, Input, Optional, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeService, ControlValueAccessorSizeThemeColorInputDirective } from '../../../core';

@Component({
  selector: 'sb-input[type=file]',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.pill]': 'pill',
    '[class.plain]': 'plain',
  },
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
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('plain') plain: any,
    themeService: ThemeService
  ) {
    super(themeService);
    if (pill == '') this.pill = true;
    if (plain == '') this.plain = true;
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
        //this.alertService.warn("The file is too big, the maximum file size is " + this.limit + ' MB!');
        return false
      }
    } else return true;
  }

  @HostBinding('class')
  get classes(): Array<string> {
    let classes = super.getClasses();
    return classes;
  }
}
