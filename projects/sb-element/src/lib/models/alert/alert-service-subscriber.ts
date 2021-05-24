import { Alert } from './alert';

export interface AlertServiceSubscriber {
  alert(alert: Alert): Promise<void>;
}
