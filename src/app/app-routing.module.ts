import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: () => import('./components/main/main.module').then(m => m.MainModule) },
  { path: 'organization', loadChildren: () => import('./components/organization/organization.module').then( m => m.OrganizationModule)},
  { path: 'user', loadChildren: () => import('./components/user/user.module').then(m => m.UserModule) },
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
  { path: 'conference', loadChildren: () => import('./components/conference/conference.module').then(m => m.ConferenceModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
