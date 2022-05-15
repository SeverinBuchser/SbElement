export { SbSlideInOutAnimationState } from './slide-in-out';
export { SbSlideAnimationState } from './slide';

import { AnimationTriggerMetadata } from '@angular/animations';
import { sbSlideInOutAnimation } from './slide-in-out';
import { sbSlideAnimation } from './slide';

export const sbAnimations: {
	readonly sbSlideInOutAnimation: AnimationTriggerMetadata;
	readonly sbSlideAnimation: AnimationTriggerMetadata;
} = {
	sbSlideInOutAnimation,
	sbSlideAnimation
};
