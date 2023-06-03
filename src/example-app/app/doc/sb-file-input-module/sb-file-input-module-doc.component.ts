import { Component, Type } from '@angular/core';
import { FileInputExampleComponent } from '../../example/file-input';

@Component({
  selector: 'app-sb-file-input-module-doc',
  templateUrl: './sb-file-input-module-doc.component.html'
})
export class SbFileInputModuleDocComponent {

  get exampleComponent(): Type<FileInputExampleComponent> {
    return FileInputExampleComponent;
  }

}
