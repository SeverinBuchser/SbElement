import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DocService } from 'example-app/src/app/util/doc/doc.service';
import { PickerCardComponent } from 'example-app/src/app/util/picker-card/picker-card.component';
import { Color, Size } from "sb-element";

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  styleUrls: ['./form-example.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormExampleComponent implements OnInit {

  public fileInputDoc: string = '';
  public buttonDoc: string = '';

  @ViewChild('fileInputPicker', { static: true })
  public fileInputPicker!: PickerCardComponent;
  @ViewChild('buttonPicker', { static: true })
  public buttonPicker!: PickerCardComponent;


  @Input()
  public color: string = Color.PRIMARY;

  @Input()
  public size: string = Size.MEDIUM;

  public options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
  public checkboxes = [
    {name: 'Option 1', checked: false},
    {name: 'Option 2', checked: false},
    {name: 'Option 3', checked: false}
  ];

  constructor(private doc: DocService) { }

  ngOnInit(): void {
    this.buttonPicker.change.subscribe(() => {
      this.handleDoc();
    })
    this.fileInputPicker.change.subscribe(() => {
      this.handleDoc();
    })
    this.handleDoc();
  }

  private handleDoc() {
    this.doc.get('forms', 'button').subscribe((doc: string) => {
      this.buttonDoc = this.doc.replace(doc, {
        pill: this.buttonPicker.shape == 'pill',
        round: this.buttonPicker.shape == 'round',
        plain: this.buttonPicker.look.includes('plain'),
        accent: this.buttonPicker.look.includes('accent'),
        color: this.buttonPicker.color,
        content: this.buttonPicker.shape == 'round' ? 'Btn' : 'Button'
      });
    })

    this.doc.get('forms', 'file-input').subscribe((doc: string) => {
      this.fileInputDoc = this.doc.replace(doc, {
        pill: this.fileInputPicker.shape == 'pill',
        plain: this.fileInputPicker.look.includes('plain'),
        accent: this.fileInputPicker.look.includes('accent'),
        color: this.fileInputPicker.color
      });
    })
  }

}
