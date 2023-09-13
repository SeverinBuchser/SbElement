import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';

export interface SbTabPositionChange {
  previous: number;
  current: number;
}

@Component({
  selector: 'sb-tab',
  templateUrl: './tab.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SbTabComponent implements OnInit {

  @ViewChild(TemplateRef, { static: true })
  public _implicitContent!: TemplateRef<any>;

  @Input('label')
  public labelString: string = '';

  @Input('labelTemplate')
  public _explicitLabel?: TemplateRef<any>;

  @ViewChild('labelTemplate', { static: true })
  public _implicitLabel!: TemplateRef<any>;

  @Input()
  public route?: string | any[];

  private _labelPortal?: TemplatePortal;
  get label(): TemplatePortal | undefined {
    return this._labelPortal;
  }

  private _contentPortal?: TemplatePortal;
  get content(): TemplatePortal | undefined {
    return this._contentPortal;
  }

  constructor(private _viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this._labelPortal = new TemplatePortal(
      this._explicitLabel || this._implicitLabel,
      this._viewContainerRef
    )

    this._contentPortal = new TemplatePortal(
     this._implicitContent,
     this._viewContainerRef,
   );
  }

}
