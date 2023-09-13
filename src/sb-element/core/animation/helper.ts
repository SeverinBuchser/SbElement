import { animate, group, query, style } from "@angular/animations";

export function transformTo({x = 100, y = 0, rotate = 0}) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%'
      })
    ], optional),
    query(':enter', [
      style(transform({x, y}))
    ], optional),
    group([
      query(':leave', [
        animate('{{ animationDuration }} ease-out', style(transform({ x: -x, y: -y })))
      ], optional),
      query(':enter', [
        animate('{{ animationDuration }} ease-out', style(transform({})))
      ], optional)
    ]),
  ];
}

export function transform({x = 0, y = 0, rotate = 0}): { transform: string } {
  return { transform: `translate(${x}%, ${y}%) rotate(${rotate}deg)` }
}