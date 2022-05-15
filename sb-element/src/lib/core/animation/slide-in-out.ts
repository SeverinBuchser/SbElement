import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationTriggerMetadata } from '@angular/animations';

export type SbSlideInOutAnimationState =
  'left' |
  'right' |
  'top' |
  'bottom' |
  'inital-left-center' |
  'intial-right-center' |
  'inital-top-center' |
  'inital-bottom-center' |
	'center' |
  'void';

export const sbSlideInOutAnimation: AnimationTriggerMetadata =
	trigger('slideInOutAnimation', [
		state('left', style({
			transform: 'translateX(-100%)',
      opacity: 0
		})),
		state('right', style({
			transform: 'translateX(100%)',
      opacity: 0
		})),
		state('top', style({
			transform: 'translateY(-100%)',
      opacity: 0
		})),
		state('bottom', style({
			transform: 'translateX(100%)',
      opacity: 0
		})),
		state(
      'inital-left-center, inital-right-center, inital-top-center, inital-bottom-center, cetner, void',
      style({
        transform: 'none',
        opacity: 1
      })
    ),
		transition(
			'void => inital-left-center', [
  			style({
  				transform: 'translateX(-100%)',
          opacity: 0
  			}),
        animate('{{animationDuration}} ease')
      ]
		),
		transition(
			'void => inital-right-center', [
  			style({
  				transform: 'translateX(100%)',
          opacity: 0
  			}),
        animate('{{animationDuration}} ease')
      ]
		),
		transition(
			'void => inital-top-center', [
  			style({
  				transform: 'translateY(-100%)',
          opacity: 0
  			}),
        animate('{{animationDuration}} ease')
      ]
		),
		transition(
			'void => inital-bottom-center', [
  			style({
  				transform: 'translateY(100%)',
          opacity: 0
  			}),
        animate('{{animationDuration}} ease')
      ]
		),
		transition(
			'* => left, * => right, * => top, * => bottom, * => center',
			animate('{{animationDuration}} ease'),
		)
	])
