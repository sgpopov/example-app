import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private formSubmitAttempt: boolean;

  public form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.formSubmitAttempt = false;
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  isFieldInvalid(field: string) {
    return (!this.form.get(field)?.valid && this.form.get(field)?.touched) || (this.form.get(field)?.untouched && this.formSubmitAttempt);
  }

  onSubmit() {
    this.formSubmitAttempt = true;

    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
