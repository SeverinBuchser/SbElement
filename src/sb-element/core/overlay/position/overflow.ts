import { SbConnectedSide } from "./position";

export interface SbDimensionsOverlapOverflow {
  distance: number;
  side: SbConnectedSide;
  direction: 'horizontal' | 'vertical';
}
