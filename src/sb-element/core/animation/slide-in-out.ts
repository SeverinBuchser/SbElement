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

export interface SbSlideInOutAnimationParams {
	animationDuration: string;
	outsideOpacity: number;
	centerOpacity: number;
}

export const sbSlideInOutAnimation: AnimationTriggerMetadata =
	trigger('slideInOutAnimation', [
		state('left', style({
			transform: 'translateX(-100%)',
      opacity: '{{ outsideOpacity }}'
		}), {params: {
			outsideOpacity: 0
		}}),
		state('right', style({
			transform: 'translateX(100%)',
      opacity: '{{ outsideOpacity }}'
		}), {params: {
			outsideOpacity: 0
		}}),
		state('top', style({
			transform: 'translateY(-100%)',
      opacity: '{{ outsideOpacity }}'
		}), {params: {
			outsideOpacity: 0
		}}),
		state('bottom', style({
			transform: 'translateX(100%)',
      opacity: '{{ centerOpacity }}'
		}), {params: {
			centerOpacity: 1
		}}),
		state(
      'inital-left-center, inital-right-center, inital-top-center, inital-bottom-center, cetner',
      style({
        transform: 'none',
        opacity: '{{ centerOpacity }}'
      }), {params: {
				centerOpacity: 1
			}}
    ),
		state('void', style({
			display: 'none'
		})),
		transition(
			'void => inital-left-center', [
  			style({
					display: 'block',
  				transform: 'translateX(-100%)',
          opacity: '{{ outsideOpacity }}'
  			}),
        animate('{{animationDuration}} ease')
      ]
		),
		transition(
			'void => inital-right-center', [
  			style({
					display: 'block',
  				transform: 'translateX(100%)',
          opacity: '{{ outsideOpacity }}'
  			}),
        animate('{{animationDuration}} ease')
      ]
		),
		transition(
			'void => inital-top-center', [
  			style({
					display: 'block',
  				transform: 'translateY(-100%)',
          opacity: '{{ outsideOpacity }}'
  			}),
        animate('{{animationDuration}} ease')
      ]
		),
		transition(
			'void => inital-bottom-center', [
  			style({
					display: 'block',
  				transform: 'translateY(100%)',
          opacity: '{{ outsideOpacity }}'
  			}),
        animate('{{animationDuration}} ease')
      ]
		),
		transition(
			'* => left, * => right, * => top, * => bottom, * => center',
			animate('{{animationDuration}} ease'),
		)
	])
