import {
  trigger,
  transition,
  AnimationTriggerMetadata,
  style,
  state,
  query} from '@angular/animations';
import { transform, transformTo } from './helper';

export type SbSlideAnimationState =
  'isCenter' |
  'isRight' |
  'isLeft';

export interface SbSlideAnimationParams {
	animationDuration: string;
}

export const sbSlideAnimation: AnimationTriggerMetadata = trigger("slideAnimation", [
    transition('* => isLeft', transformTo({ x: -100 }) ),
    transition('* => isRight', transformTo({ x: 100 }) ),
    transition('isRight => *', transformTo({ x: -100 }) ),
    transition('isLeft => *', transformTo({ x: 100 }) )
]);


