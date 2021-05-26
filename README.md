# SbElement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Git

When finished with development on a branch (story marked as DONE), the branch will be merged into develop. After merging, the branch will be archived and deleted:

```shell
$ git checkout develop
$ git merge {type}-{type-number}/{branch-name}
$ git tag archive/{type}-{type-number}/{branch-name} {type}-{type-number}/{branch-name}
$ git push origin archive/{type}-{type-number}/{branch-name}
$ git branch -d {type}-{type-number}/{branch-name}
$ git push origin --delete {type}-{type-number}/{branch-name}
$ git push
```

This will merge, archive and delete the branch.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
