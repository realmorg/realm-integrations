import { Routes } from '@angular/router';
import { AccountPage } from './pages/account';
import { SubscribedPage } from './pages/subscribed';

export const routes: Routes = [
  { path: '', component: AccountPage, title: 'Account' },
  { path: 'subscribed', component: SubscribedPage, title: 'Subscribed' },
];
