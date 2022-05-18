import { SbToggleCore } from '../toggle';

export interface SbSelectToggle<T> {
	name: T;
	toggled: boolean;
}

export class SbSelectCore<Selectable> {

  private _options: Array<Selectable> = new Array<Selectable>();
	set options(options: Array<Selectable>) {
		this._options = options;
		this._toggles = new Map();
		this._options.forEach((option: Selectable) => {
			this._toggles.set(option, new SbToggleCore());
		})
    this.updateToggles();
	}
	get options(): Array<Selectable> {
		return this._options;
	}

	protected _toggles: Map<Selectable, SbToggleCore> = new Map<Selectable, SbToggleCore>();
  public toggles: Array<SbSelectToggle<Selectable>> = new Array();

  protected updateToggles(): void {
    this.toggles = Array.from(this._toggles.entries())
    .map((value: [Selectable, SbToggleCore]) => {
      return {
        name: value[0],
        toggled: value[1].toggled
      }
    })
  }

	public isSelected(option: Selectable): boolean {
		let toggle = this.get(option);
		return toggle ? toggle.toggled : false;
	}

	public toggle(option: Selectable, isToggled?: boolean): void {
		let toggle = this.get(option);
		if (toggle) {
			toggle.toggle(isToggled);
      this.updateToggles();
		}
	}

	protected unset(option: Selectable | undefined): void {
		let toggle = this.get(option);
		if (toggle) {
			toggle.toggle(false);
      this.updateToggles();
		}
	}

	protected set(option: Selectable | undefined): void {
		let toggle = this.get(option);
		if (toggle) {
			toggle.toggle(true);
      this.updateToggles();
		}
	}

	protected get(option: Selectable | undefined): SbToggleCore | undefined {
		if (option !== undefined) {
			return this._toggles.get(option);
		}
		return;
	}
}
