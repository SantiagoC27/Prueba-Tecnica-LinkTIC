import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'productos',
    pathMatch: 'full'
  },
  {
    path: 'productos',
    loadComponent: () =>
      import('./components/productos-list/productos-list').then(
        (m) => m.ProductosListComponent
      )
  },
  {
    path: 'productos/:id',
    loadComponent: () =>
      import('./components/producto-detalle/producto-detalle').then(
        (m) => m.ProductoDetalleComponent
      )
  },
  {
    path: '**',
    redirectTo: 'productos'
  }
];
