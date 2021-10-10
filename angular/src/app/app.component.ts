import { Component, VERSION as ngv } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app';
  angularVersion: string = ngv.full;
}
