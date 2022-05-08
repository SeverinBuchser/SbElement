import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationTriggerMetadata,} from '@angular/animations';

export type SbSlideAnimationState =
  'left' |
  'right' |
  'center' |
  'void' |
  'inital-center-left' |
  'inital-center-right';

export const sbSlideAnimation: AnimationTriggerMetadata =
	trigger('slideAnimation', [
		state('left', style({
			transform: 'translateX(-100%)'
		})),
		state('right', style({
			transform: 'translateX(100%)'
		})),
		state(
      'center, void, inital-center-left, inital-center-right', 
      style({transform: 'none'})
    ),
		transition(
			'* => left, * => right, left => center, right => center',
			animate('{{animationDuration}} ease'),
		),
		transition(
			'void => inital-center-left', [
			style({
				transform: 'translateX(100%)'
			}),
			animate('{{animationDuration}} ease')
		]),
		transition(
			'void => inital-center-right', [
			style({
				transform: 'translateX(-100%)'
			}),
			animate('{{animationDuration}} ease')
		])
	])
