# SbElement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1. The project consist out of a test application and the actual project, which is located in the projects directory. The actual project is a component library for angular, which uses the SCSS library [sb-theming](https://github.com/SeverinBuchser/SbTheming). The SCSS library can be installed and used separately, but is recommended to be used in combination with this library.

The goal of this library is to provide a robust and easy-to-use page-layout, which can be customized to a certain extend. The library provides components for input, such as checkboxes and  radio-buttons, as well as layouting components, which help achieve an overall consistent user interface. 

The library also provides installation support with [Angular Schematics](https://www.npmjs.com/package/@angular-devkit/schematics-cli).

## Installation

Since this is not the actual library, but rather the project for developing the library, you can simply clone the project and install it with the following command run from within the angular workspace.

```bash
npm install
```

## Development server

To start the dev server for the test application run

```bash
npm run start
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. When working on the library, navigate to the library's directory and run

```bash
npm run dev
```

This will build the library in development mode and watch out for changes in the library's source-code.

## Build

To build the library, run `ng build SbElement` or navigate to the library's directory and run

```bash
npm run build
```

This will compile the library code into JavaScript and put the compiled code into the `dist/sb-element/` directory. Building instructions for the schematics for the library can be found [here](https://github.com/SeverinBuchser/SbElementSchematics) (the schematics need to be cloned separately and also developed separately).

To build the whole project, run `ng build`. The build artifacts will be stored in the `dist/` directory.

## Further help

Documentation is not yet available for this project. To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

