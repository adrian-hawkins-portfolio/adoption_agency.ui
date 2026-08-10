import { Route } from '@angular/router';
import { Core } from './core/core';

export const coreRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'pets',
    pathMatch: 'full'
  },
  {
    path: 'inspection',
    loadChildren: () =>
      import('@adoption-agency.ui/inspection').then((m) => m.inspectionRoutes),
  },
  {
    path: 'pets',
    loadChildren: () =>
      import('@adoption-agency.ui/pets').then((m) => m.petsRoutes),
  },
];
