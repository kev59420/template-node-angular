import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/pages/layout/layout.component';
import { loadAuthStateGuard } from './core/guards/loadAuthState.guard';
import { AccessDeniedComponent } from './core/pages/access-denied/access-denied.component';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { MaintenanceComponent } from './core/pages/maintenance/maintenance.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [loadAuthStateGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      }
    ],
  },
  {
    path:'access-denied',
    component: AccessDeniedComponent
  },
  { 
    path: '**', 
    component: PageNotFoundComponent
  },
  { 
    path: 'maintenance', 
    component: MaintenanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
