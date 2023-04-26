import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'train',
    loadComponent: () =>
      import('./train/train.component').then((m) => m.TrainComponent),
  },
  {
    path: 'predict',
    loadComponent: () =>
      import('./predict/predict.component').then((m) => m.PredictComponent),
  },
  {
    path: '**',
    redirectTo: 'predict',
    pathMatch: 'full',
  },
];
