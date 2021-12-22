import { Component, Input } from '@angular/core';
import { LinkedList } from "../../models/linked-list/linked-list";
import { ListItem } from "../../models/linked-list/list-item";
import { ThemeColorInputDirective } from '../base/style-input/theme-color-input.directive';

type State = 'current' | 'awaiting' | 'done' | 'pending';
type Step = {name: string, state: State, line: boolean};

@Component({
  selector: 'sb-el-timeline',
  templateUrl: './timeline.component.html'
})
export class TimelineComponent extends ThemeColorInputDirective {

  public rootClass = 'sb-el-timeline';

  private current?: ListItem<Step>;

  private _steps: LinkedList<Step> = new LinkedList<Step>();
  get steps(): LinkedList<Step> {
    return this._steps;
  }

  @Input()
  set stepNames(stepNames: Array<string>) {
    this._steps = new LinkedList(stepNames.map(
      (stepName: string, index: number) => {
        return {name: stepName, state: 'awaiting', line: index < stepNames.length - 1 ? true : false};
      }
    ))
    this.current = this._steps.start;
    this.current.value.state = 'current';
  }

  get gridDim(): string {
    return this._steps.length + "x2";
  }

  public start(): void {
  }

  public nextDone(): void {
    if (this.current) {
      this.current.value.state = 'done';
      if (this.current.next) {
        this.current = this.current.next;
        this.current.value.state = 'current';
      }
    }
  }

  public nextPending(): void {
    if (this.current) {
      this.current.value.state = 'pending';
      if (this.current.next) {
        this.current = this.current.next;
        this.current.value.state = 'current';
      }
    }
  }

  public setDone(index: number): void;
  public setDone(name: string): void;
  public setDone(indexOrName: number | string): void {
    this.setState(indexOrName, 'done');
  }

  public setPending(index: number): void;
  public setPending(name: string): void;
  public setPending(indexOrName: number | string): void {
    this.setState(indexOrName, 'pending');
  }

  private setState(indexOrName: number | string, state: State): void {
    let index = this.getIndex(indexOrName);
    if (index >= 0) {
      let item = this._steps.getItem(index);
      if (item.value.state == 'current' && item.next && item.next.value.state == 'awaiting') {
        item.next.value.state = 'current';
        this.current = item.next;
      }
      item.value.state = state;
    } else {
      throw new RangeError(`Index ${index} is out of bounds!`);
    }
  }

  private getIndex(indexOrName: number | string): number {
    let index = 0;
    if (typeof(indexOrName) == 'string') {
      index = this._steps.indexOf((value: Step) => {
        return value.name == indexOrName ? true : false;
      })
    } else if (typeof(indexOrName) == 'number') {
      index = indexOrName;
    }
    return index;
  }

  public previous(): void {
    if (this.current) {
      if (this.current.previous) {
        this.current.value.state = 'awaiting';
        this.current = this.current.previous;
        this.current.value.state = 'current';
      }
    }
  }

  public previousDone(): void {
    if (this.current) {
      if (this.current.previous) {
        this.current.value.state = 'done';
        this.current = this.current.previous;
        this.current.value.state = 'current';
      }
    }
  }

  public previousPending(): void {
    if (this.current) {
      if (this.current.previous) {
        this.current.value.state = 'pending';
        this.current = this.current.previous;
        this.current.value.state = 'current';
      }
    }
  }

  public getLineClasses(index: number): Array<string> {
    let classes = new Array<string>();
    let state = this._steps.getItem(index).value.state;
    classes.push(this.rootClass + '__line');

    let isBefore = state != 'current';
    for (let i = 0 ; i < index ; i++) {
      if (this._steps.getItem(i).value.state == 'current') {
        isBefore = false;
        break;
      }
    }
    if (isBefore) {
      classes.push('active')
    }
    return classes;
  }

}
