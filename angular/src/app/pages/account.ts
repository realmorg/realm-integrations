import { HttpClient } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  name: string;
  plan: string;
}

@Component({
  selector: 'app-account',
  imports: [ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <h1>Account</h1>

    @if (user(); as user) {
      <user-card [name]="user.name" [plan]="user.plan"></user-card>
    }

    <form [formGroup]="form" (ngSubmit)="subscribe()" ngNativeValidate>
      <ui-field>
        <ui-label for="email">Email</ui-label>
        <ui-input id="email" name="email" type="email" required formControlName="email" ngDefaultControl></ui-input>
      </ui-field>
      <ui-button type="submit">Subscribe</ui-button>
    </form>
  `,
})
export class AccountPage {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  protected readonly user = toSignal(this.http.get<User>('/api/me'));
  protected readonly form = new FormGroup({ email: new FormControl('', { nonNullable: true }) });

  subscribe() {
    this.http.post<{ email: string }>('/api/subscribe', this.form.getRawValue()).subscribe(({ email }) => {
      this.router.navigate(['/subscribed'], { queryParams: { email } });
    });
  }
}
