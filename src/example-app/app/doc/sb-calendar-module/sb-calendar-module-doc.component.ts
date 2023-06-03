import { Component, Type } from '@angular/core';
import { CalendarExampleComponent } from '../../example/calendar';

@Component({
  selector: 'app-sb-calendar-module-doc',
  templateUrl: './sb-calendar-module-doc.component.html'
})
export class SbCalendarModuleDocComponent {

  get exampleComponent(): Type<CalendarExampleComponent> {
    return CalendarExampleComponent;
  }

}
