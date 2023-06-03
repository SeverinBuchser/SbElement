import { TitleCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'docRoute'
})
export class DocRoutePipe implements PipeTransform {

  transform(value: string | undefined): string {
    const titleCasePipe = new TitleCasePipe();
    if (value) {
      return value.split('-')
        .filter(split => !/module|sb/.test(split))
        .map(split => titleCasePipe.transform(split))
        .join('');
    }
    return '';
  }

}
