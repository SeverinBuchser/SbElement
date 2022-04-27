
export class SbToggleCore {

  private _toggled: boolean = false;
  get toggled(): boolean {
    return this._toggled;
  }
  set toggled(isToggled: boolean) {
    this.toggle(isToggled);
  }

  public toggle(isToggled?: boolean): void {
    if (isToggled !== undefined && isToggled !== this.toggled) {
      this._toggled = isToggled;
    } else if (isToggled == undefined) {
      this._toggled = !this.toggled;
    }
  }

}
