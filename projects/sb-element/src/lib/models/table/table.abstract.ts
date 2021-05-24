import { ColumnInformationInterface } from './column-information.interface';

export abstract class TableAbstract {
  abstract columnInformation: Array<ColumnInformationInterface>;
  abstract data: Array<Array<any>>
  public getColumnInformation(nameOrIndex: string | number): ColumnInformationInterface {
    if (typeof nameOrIndex === 'number') {
      return this.columnInformation[nameOrIndex]
    } else {
      let info = this.columnInformation.find(columnInformation => {
        return columnInformation.name === nameOrIndex
      })
      if (info) return info;
      else throw new Error('Column Information with name' + nameOrIndex + 'does not exist!')
    }
  }
}
