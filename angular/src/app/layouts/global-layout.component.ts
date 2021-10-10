import { Component } from '@angular/core';

@Component({
  selector: 'app-global-layout',
  template: `
    <app-navigation></app-navigation>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class GlobalLayoutComponent {}
