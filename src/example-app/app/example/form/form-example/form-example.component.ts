import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DocService } from '../../../util/doc/doc.service';
import { PickerCardComponent } from '../../../util/picker-card/picker-card.component';
import { Color, Size } from "sb-element";

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  encapsulation: ViewEncapsulation.None
})
export class FormExampleComponent implements OnInit {

  public toggleButtonDoc: string = '';
  public toggleCheckboxDoc: string = '';
  public toggleSwitchDoc: string = '';
  public fileInputDoc: string = '';
  public buttonDoc: string = '';

  @ViewChild('toggleButtonPicker', { static: true })
  public toggleButtonPicker!: PickerCardComponent;
  @ViewChild('toggleCheckboxPicker', { static: true })
  public toggleCheckboxPicker!: PickerCardComponent;
  @ViewChild('toggleSwitchPicker', { static: true })
  public toggleSwitchPicker!: PickerCardComponent;
  @ViewChild('fileInputPicker', { static: true })
  public fileInputPicker!: PickerCardComponent;
  public hi = 'Option 1';

  @Input()
  public color: string = Color.PRIMARY;

  @Input()
  public size: string = Size.MEDIUM;

  public options = ['Option 1111111111111111111111111111111', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
  public checkboxes = [
    {name: 'Option 1', toggled: true},
    {name: 'Option 2', toggled: false},
    {name: 'Option 3', toggled: false}
  ];

  constructor(private doc: DocService) { }

  ngOnInit(): void {
    this.toggleButtonPicker.change.subscribe(() => {
      this.handleDoc();
    })
    this.toggleCheckboxPicker.change.subscribe(() => {
      this.handleDoc();
    })
    this.toggleSwitchPicker.change.subscribe(() => {
      this.handleDoc();
    })
    this.fileInputPicker.change.subscribe(() => {
      this.handleDoc();
    })
    this.handleDoc();
  }

  private handleDoc() {

    this.doc.get('forms', 'toggle-button').subscribe((doc: string) => {
      this.toggleButtonDoc = this.doc.replace(doc, {
        pill: this.toggleButtonPicker.shape == 'pill',
        round: this.toggleButtonPicker.shape == 'round',
        accent: this.toggleButtonPicker.look.includes('accent'),
        color: this.toggleButtonPicker.color,
        content: this.toggleButtonPicker.shape == 'round' ? 'Btn' : 'Toggle Button'
      });
    })

    this.doc.get('forms', 'toggle-checkbox').subscribe((doc: string) => {
      this.toggleCheckboxDoc = this.doc.replace(doc, {
        accent: this.toggleCheckboxPicker.look.includes('accent'),
        color: this.toggleCheckboxPicker.color
      });
    })

    this.doc.get('forms', 'toggle-switch').subscribe((doc: string) => {
      this.toggleSwitchDoc = this.doc.replace(doc, {
        accent: this.toggleSwitchPicker.look.includes('accent'),
        color: this.toggleSwitchPicker.color
      });
    })

    // this.doc.get('forms', 'button').subscribe((doc: string) => {
    //   this.buttonDoc = this.doc.replace(doc, {
    //     pill: this.buttonPicker.shape == 'pill',
    //     round: this.buttonPicker.shape == 'round',
    //     plain: this.buttonPicker.look.includes('plain'),
    //     accent: this.buttonPicker.look.includes('accent'),
    //     color: this.buttonPicker.color,
    //     content: this.buttonPicker.shape == 'round' ? 'Btn' : 'Button'
    //   });
    // })

    this.doc.get('forms', 'file-input').subscribe((doc: string) => {
      this.fileInputDoc = this.doc.replace(doc, {
        pill: this.fileInputPicker.shape == 'pill',
        plain: this.fileInputPicker.look.includes('plain'),
        accent: this.fileInputPicker.look.includes('accent'),
        color: this.fileInputPicker.color
      });
    })
  }

  log() {
    console.log("Hi")
  }

}
