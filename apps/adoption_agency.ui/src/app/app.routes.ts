import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@adoption-agency.ui/core').then((m) => m.coreRoutes),
  },
];
