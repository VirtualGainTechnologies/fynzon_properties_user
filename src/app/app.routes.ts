import { Routes } from '@angular/router';
import { homeRoutes } from './Home/home.routes';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/Home/home.routes').then((m) => m.homeRoutes),
  },
];
