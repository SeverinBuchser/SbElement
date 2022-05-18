import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationTriggerMetadata,} from '@angular/animations';

export type SbCollapseAnimationState =
  'collapsed' |
  'open' |
  'void' | 
	'inital-open';

export interface SbCollapseAnimationParams {
	animationDuration: string;
}

export const sbCollapseAnimation: AnimationTriggerMetadata =
	trigger('collapseAnimation', [
		state('collapsed', style({
			transform: 'scaleY(0)'
		})),
		state('open, void', style({
			transform: 'none'
		})),
		transition(
			'collapsed => open',
			animate('{{ animationDuration }} ease')
		),
		transition(
			'* => collapsed', 
			animate('{{ animationDuration }} ease')
		),
		transition(
			'void => inital-open', [
			style({
				transform: 'scaleY(0)'
			}),
			animate('{{ animationDuration }} ease')
		])
	])
