import { OverlayRef } from "@angular/cdk/overlay";
import { SbAlertContainerComponent } from "./alert-container";
import { Subject } from "rxjs";
import { SbAlertConfig } from "./alert-config";

export class SbAlertRef {
	public dismissed: Subject<void> = new Subject();
	public interrupted: Subject<void> = new Subject();
	public disposed: Subject<void> = new Subject();
	private _isDisposed: boolean = false;
	private _timeout?: number;

	constructor(
		private _overlayRef: OverlayRef,
		private _alertContainer: SbAlertContainerComponent,
		private _config: SbAlertConfig
	) {
		this._alertContainer.afterExit.subscribe(() => this.dismiss());
	}

	public consume(): void {
		if (!this._isDisposed) {
			this._alertContainer.enter();

			if (this._config.duration && this._config.duration > 0) {
				this._timeout = setTimeout(() => {
					this._alertContainer.exit();
				}, this._config.duration)
			}
		}
	}

	public interrupt(): void {
		if (!this._isDisposed) {
			if (this._config.isInterruptable) {
				clearTimeout(this._timeout);
				this._alertContainer.exit();
			} else {
				throw new Error("AlertRef is not dismissable");
			}
		}
	}

	private dismiss() {
		if (!this._isDisposed) {
			this.dismissed.next();
		}
	}

	public dispose(): void {
		this.dismissed.subscribe(() => {
			this._actualDispose();
		});
		if (this._alertContainer.isInactive()) {
			this._actualDispose();
		} else if (this._config.isInterruptable) {
			this.interrupt();
		}
	}

	private _actualDispose(): void {
		this._isDisposed = true;
		this._overlayRef.detach();
		this._overlayRef.dispose();
		this.dismissed.complete();

		this.disposed.next();
		this.disposed.complete();
	}


}
