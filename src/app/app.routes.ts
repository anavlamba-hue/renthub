import { Routes } from '@angular/router';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'RentHub | Find your place',
  },
  {
    path: 'listings/:id',
    loadComponent: () =>
      import('./features/listings/listing-details/listing-details').then((m) => m.ListingDetails),
    title: 'Property Details | RentHub',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
    title: 'Log in | RentHub',
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
    title: 'Create account | RentHub',
  },
  {
    path: 'account',
    canActivate: [authGuard],
    loadComponent: () => import('./features/account/account').then((m) => m.Account),
    title: 'My Account | RentHub',
  },
  {
    path: 'favourites',
    canActivate: [authGuard],
    loadComponent: () => import('./features/favourites/favourites').then((m) => m.Favourites),
    title: 'My Favourites | RentHub',
  },
  {
    path: 'create-listing',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/listings/create-listing/create-listing').then((m) => m.CreateListing),
    title: 'Create a Listing | RentHub',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
