export { SbCollapseAnimationState, SbCollapseAnimationParams } from './collapse';
export { SbSlideAnimationState, SbSlideAnimationParams } from './slide';
export { SbSlideInOutAnimationState, SbSlideInOutAnimationParams } from './slide-in-out';

import { AnimationTriggerMetadata } from '@angular/animations';
import { sbSlideInOutAnimation } from './slide-in-out';
import { sbSlideAnimation } from './slide';
import { sbCollapseAnimation } from './collapse';

export const sbAnimations: {
	readonly sbCollapseAnimation: AnimationTriggerMetadata;
	readonly sbSlideInOutAnimation: AnimationTriggerMetadata;
	readonly sbSlideAnimation: AnimationTriggerMetadata;
} = {
	sbCollapseAnimation,
	sbSlideInOutAnimation,
	sbSlideAnimation
};
