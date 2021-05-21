import { TableInterface } from './table-interface';

export class Table implements TableInterface {
  header = ['First Name', 'Last Name', 'Address', 'Email'];
  data = [
    ['Severin', 'Buchser', 'Gumisweg 7', 'severin.buchser@gmx.ch'],
    ['Rafael', 'Buchser', 'Gumisweg 7', 'rafael.buchser@gmx.ch'],
    ['Christoph', 'Buchser', 'Gumisweg 7', 'christoph.buchser@gmx.ch'],
    ['Beatrice', 'Buchser', 'Gumisweg 7', 'beatrice.buchser@gmx.ch'],
  ];
}
