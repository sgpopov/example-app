import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CreateFileComponent } from './files/views/create-file/create-file.component';
import { FilesComponent } from './files/views/list-files/files.component';
import { HomeComponent } from './home/home.component';
import { GlobalLayoutComponent } from './layouts/global-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: GlobalLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'files',
        component: FilesComponent,
      },
      {
        path: 'files/create',
        component: CreateFileComponent,
      },
    ],
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

const routeOptions: ExtraOptions = {
  enableTracing: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routeOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
