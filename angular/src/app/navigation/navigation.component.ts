import { Component } from '@angular/core';
import { CustomLink } from './custom-link';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  public background = 'primary';
  public links: CustomLink[] = [{ path: 'files', label: 'Файлове' }];

  constructor(private authService: AuthService) {}

  public logout() {
    this.authService.logout();
  }
}
