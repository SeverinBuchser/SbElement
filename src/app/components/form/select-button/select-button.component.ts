import { Attribute, Component, Optional } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { SelectionOptionsDirective } from '../group/base/selection-options.directive';

@Component({
  selector: 'sb-el-select-button',
  templateUrl: './select-button.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SelectButtonComponent,
    multi: true
  }]
})
export class SelectButtonComponent extends SelectionOptionsDirective<string> {

  public plain: boolean = false;
  public pill: boolean = false;
  public showOptions: boolean = false;

  constructor(
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('plain') plain: any,
    themeService: ThemeService
  ) {
    super(themeService);
    if (pill === '') this.pill = true;
    if (plain === '') this.plain = true;
    this.rootClass = 'sb-el-select-button';
  }

  public toggle(): void {
    this.showOptions = !this.showOptions;
  }

  public select(newOption: string) {
    this.toggle();
    this.options.forEach((option: string) => {
      if (option !== newOption) this.selectedOptions[option] = false;
    })
    this.writeValueInnerChange(newOption);
  }

  protected updateValues(): void {
    this.options.forEach((option: string) => {
      if (option === this.value) {
        this.selectedOptions[option] = true;
      } else this.selectedOptions[option] = false;
    })
  }

  public getButtonClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push('sb-el-select-button__button');
    return classes;
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.pill ? 'is-pill' : '');
    classes.push(this.plain ? 'is-plain': '');
    classes.push(this.showOptions ? 'is-open' : 'is-closed');
    return classes;
  }
}
