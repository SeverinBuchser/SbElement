import { ClassDeclaration, Project } from "ts-morph";

export class AngularProject extends Project {
  public getAngularModules(): Array<ClassDeclaration> {
    return this.getSourceFiles().map(sourceFile => sourceFile.getClasses()).flat()
      .filter(classDeclaration => classDeclaration.getDecorator("NgModule") ? true : false);
  }
}