import { TableAbstract } from './table.abstract';

export class TableModel extends TableAbstract {
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