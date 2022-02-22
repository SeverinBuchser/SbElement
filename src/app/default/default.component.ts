import { filter } from "rxjs/operators";
import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, Routes } from "@angular/router";
import { SbAlertService, SbThemeService, Size, MarkedDates, mixinClassName, mixinTheme, mixinColor, Color } from 'sb-element';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DefaultComponent extends
mixinColor(
  mixinTheme(
    mixinClassName(
      class {
        constructor(
          public _elementRef: ElementRef,
          public _themeService: SbThemeService) {}
      }, 'default'
    )
  ), Color.PRIMARY
) {

  public options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  public model = {
    select: 'Option 1',
    checkboxes: [{name: 'Option 1', checked: false}, {name: 'Option 2', checked: false}, {name: 'Option 3', checked: false}],
    radios: 'Option 1',
    slider: 0,
    input: 'severin.buchser@gmx.ch',
    fileinput: '',
    date: new Date(),
    dateRange: new MarkedDates(new Date(), new Date()),
    spinner: null,
    time: 0,
    double: ''
  };

  public crumbs = ['Home', 'Example'];

  public toggle: boolean = false;

  public routes: Routes = [];

  constructor(
    themeService: SbThemeService,
    elementRef: ElementRef,
    private alertService: SbAlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(elementRef, themeService)

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => this.updateCrumbs())
    if (this.route.routeConfig?.children) {
      this.routes = this.route.routeConfig?.children;
    }
  }

  private updateCrumbs(): void {
    this.crumbs = this.router.url.split('/').map((urlSegment: string) => {
      if (urlSegment == '') return 'HOME';
      else return urlSegment.toUpperCase();
    })
  }

  onSubmit(form: NgForm) {
    console.log(this.model);
    this.alertService.success("Success Notification", Size.DEFAULT);
  }

  ngOnInit() {
  }

  toggleTheme() {
    if (this._themeService.get() == 'dark') {
      this._themeService.commit('light');
    } else {
      this._themeService.commit('dark');
    }
  }

  handleNavigate(path: Array<string>) {
    this.router.navigate(path.map((urlSegment: string) => {
      if (urlSegment == 'HOME') return '';
      else return urlSegment.toLowerCase();
    }))
  }
}
