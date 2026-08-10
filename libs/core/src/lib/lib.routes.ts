import { Route } from '@angular/router';
import { Core } from './core/core';

export const coreRoutes: Route[] = [
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
  { path: '', component: Core },
];
