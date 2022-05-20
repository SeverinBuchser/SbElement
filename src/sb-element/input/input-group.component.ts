import {
  Component,
  ElementRef,
  EmbeddedViewRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';

import {
  Color,
  hasElementRefClass, mixinClassName,
  mixinColor, mixinSize, Size
} from '../core';

const SbInputGroupCore = mixinSize(
  mixinColor(
    mixinClassName(hasElementRefClass, 'sb-input-group'),
    Color.PRIMARY
  ),
  Size.MEDIUM
)

@Component({
  selector: 'sb-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SbInputGroupComponent extends SbInputGroupCore {

  @ViewChild('childrenOutlet', { read: ViewContainerRef, static: true})
  public outlet!: ViewContainerRef;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public attach<C>(
    templateRef: TemplateRef<C>, 
    context?: C, 
    index?: number
  ): EmbeddedViewRef<any> {
    return this.outlet.createEmbeddedView<C>(templateRef, context, index);
  }

}

