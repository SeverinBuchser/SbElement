import { AbstractTable } from './abstract-table';

export class Table extends AbstractTable {
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
      },
      {
        name: 'Email',
        color: '',
        alignment: 'center'
      },
      {
        name: 'Email',
        color: '',
        alignment: 'center'
      }
  ];
  data = [
    ['Severin', 'Buchser', 'Gumisweg 7', 'sevn.buer@gmx.ch', 'sth'],
    ['Rafael', 'Buchser', 'Gumisweg 7', 'rafaeuer@gmx.ch', 'sth'],
    ['Christoph', 'Buchser', 'Gumisweg 7', 'chtoph.bser@gmx.ch', 'sth'],
    ['Beatrice', 'Buchser', 'Gumisweg 7', 'beatriucr@gmx.ch', 'sth'],
    ['Beatrice', 'Buchser', 'Gumisweg 7', 'beatriucr@gmx.ch', 'sth'],
  ];
}
