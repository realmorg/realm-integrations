import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subscribed',
  imports: [RouterLink],
  template: `
    <h1>Thanks</h1>
    <p>Subscribed: {{ email() }}</p>
    <p><a routerLink="/">Back</a></p>
  `,
})
export class SubscribedPage {
  readonly email = input('');
}
