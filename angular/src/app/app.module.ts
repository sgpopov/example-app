import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { FilesService } from './files/files.service';
import { CreateFileComponent } from './files/views/create-file/create-file.component';
import { FilesComponent } from './files/views/list-files/files.component';
import { HomeComponent } from './home/home.component';
import { GlobalLayoutComponent } from './layouts/global-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CustomMaterialModule } from './shared/custom-material.module';

@NgModule({
  declarations: [
    AppComponent,
    CreateFileComponent,
    FilesComponent,
    GlobalLayoutComponent,
    HomeComponent,
    LoginComponent,
    LoginLayoutComponent,
    NavigationComponent,
    PageNotFoundComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CustomMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    FilesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
