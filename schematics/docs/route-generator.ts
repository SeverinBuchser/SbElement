import { ArrayJoiner, ObjectJoiner, ObjectKeyValueGenerator, toGeneratable } from "../util";

export class Router extends ArrayJoiner<Route> {}

export class Route extends ObjectJoiner {
  constructor(
    tabCount: number, 
    path: string, 
    component: string, 
    children?: Router,
    indentFirstBracket: boolean = false
  ) {
    super(
      tabCount,
      [
        new ObjectKeyValueGenerator('path', toGeneratable(`'${path}'`)),
        new ObjectKeyValueGenerator('component', toGeneratable(component))
      ],
      indentFirstBracket
    );

    if (children) {
      this.add(new ObjectKeyValueGenerator('children', children))
    }
  }
}


// usage:
// const router = new Router(1, 
//   [
//     new Route(0, 'asdf', 'SbAlertBox'), 
//     new Route(0, 'asdf', 'SbAlertBox'),
//     new Route(0, 'asdf', 'SbAlertBox', new Router(0, 
//       [
//         new Route(0, 'asdf', 'Abasdf'),
//         new Route(0, 'asdf', 'Abasdf')
//       ]
//     ))
//   ],
//   false
// )