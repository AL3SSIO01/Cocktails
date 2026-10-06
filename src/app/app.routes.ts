import { Routes } from '@angular/router';
import { Home } from './sections/home/home';
import { Preferiti } from './sections/preferiti/preferiti';
import { Cocktails } from './sections/cocktails/cocktails';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'preferiti', component: Preferiti },
  { path: 'cocktails', component: Cocktails },
  { path: '**', redirectTo: '' },
];
