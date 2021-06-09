import { Table } from "sb-element";

export class TableModel extends Table {
  columnInformation = [
      {
        name: 'First Name',
        color: 'primary',
        alignment: 'center'
      },
      {
        name: 'Last Name',
        color: '',
        alignment: 'center'
      },
      {
        name: 'Address',
        color: '',
        alignment: 'center'
      }
  ];
  data = [
    ['Severin', 'Buchser', 'Gumisweg 7'],
    ['Rafael', 'Buchser', 'Gumisweg 7'],
    ['Christoph', 'Buchser', 'Gumisweg 7'],
    ['Beatrice', 'Buchser', 'Gumisweg 7'],
    ['Beatrice', 'Buchser', 'Gumisweg 7'],
  ];
}
