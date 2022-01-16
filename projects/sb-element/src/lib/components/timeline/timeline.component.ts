import { Component, Input } from '@angular/core';
import { LinkedList } from "../../models/linked-list/linked-list";
import { ListItem } from "../../models/linked-list/list-item";
import { ThemeColorInputDirective } from '../../core/style-input/theme-color-input.directive';

type State = 'current' | 'awaiting' | 'done' | 'pending';
type Step = {name: string, state: State, line: boolean};

@Component({
  selector: 'sb-el-timeline',
  templateUrl: './timeline.component.html'
})
export class TimelineComponent extends ThemeColorInputDirective {

  public rootClass = 'sb-el-timeline';

  private _steps: LinkedList<Step> = new LinkedList<Step>();
  get steps(): LinkedList<Step> {
    return this._steps;
  }

  private current: ListItem<Step> = this._steps.start;

  @Input()
  set stepNames(stepNames: Array<string>) {
    let steps: Array<Step> = stepNames.map(
      (stepName: string, index: number) => { return {
        name: stepName,
        state: 'awaiting',
        line: index < stepNames.length - 1 ? true : false
      }}
    );
    this._steps = new LinkedList(steps);
    this.current = this._steps.start;
  }

  get gridDim(): string {
    return this._steps.length + "x2";
  }

  private updateNext(state: State) {
    if (this.current.next) {
      if (!this.steps.isStart(this.current)) {
        this.current.value.state = state;
      }
      this.current = this.current.next;
      if (!this.steps.isEnd(this.current)) {
        this.current.value.state = 'current';
      }
    }
  }

  private updatePrevious(state: State) {
    if (this.current.previous) {
      if (!this.steps.isEnd(this.current)) {
        this.current.value.state = state;
      }
      this.current = this.current.previous;
      if (!this.steps.isStart(this.current)) {
        this.current.value.state = 'current';
      }
    }
  }

  public nextDone(): void {
    this.updateNext('done');
  }

  public nextPending(): void {
    this.updateNext('pending');
  }

  public previous(): void {
    this.updatePrevious('awaiting');
  }

  public previousDone(): void {
    this.updatePrevious('done');
  }

  public previousPending(): void {
    this.updatePrevious('pending');
  }

  public setCurrent(index: number): void;
  public setCurrent(name: string): void;
  public setCurrent(indexOrName: number | string): void {
    this.setState(indexOrName, 'current');
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

  public getLineClasses(index: number): Array<string> {
    let classes = new Array<string>();
    let state = this._steps.getItem(index).value.state;
    classes.push(this.rootClass + '__line');

    let isBeforeCurrent = state != 'current' && !this._steps.isStart(this.current);
    for (let i = 0 ; i < index ; i++) {
      if (this._steps.getItem(i).value.state == 'current') {
        isBeforeCurrent = false;
        break;
      }
    }
    if (isBeforeCurrent) {
      classes.push('active')
    }
    return classes;
  }

}