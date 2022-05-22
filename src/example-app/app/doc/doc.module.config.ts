import { Type } from "@angular/core";
import { AlertExampleComponent } from "./alert/example";
import { BreadcrumbsExampleComponent } from "./breadcrumbs/example";
import { ButtonExampleComponent } from "./button/example";
import { CalendarExampleComponent } from "./calendar/example";
import { CardExampleComponent } from "./card/example";
import { ContainerExampleComponent } from "./container/example";

export class DocConfig {

  constructor(
    public rootModule: string, 
    public exampleConfig: Array<ModuleExample> = new Array()
  ) {}
  
}

export interface ModuleExample {
  moduleName: string;
  exampleComponent: Type<any>;
}

export const docConfig = new DocConfig('SbElementModule', [
  { moduleName: 'SbAlertModule', exampleComponent: AlertExampleComponent },
  { moduleName: 'SbBreadcrumbsModule', exampleComponent: BreadcrumbsExampleComponent},
  { moduleName: 'SbButtonModule', exampleComponent: ButtonExampleComponent},
  { moduleName: 'SbCalendarModule', exampleComponent: CalendarExampleComponent},
  { moduleName: 'SbCardModule', exampleComponent: CardExampleComponent},
  { moduleName: 'SbContainerModule', exampleComponent: ContainerExampleComponent}
]);