import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/pages/layout/layout.component';
import { NavbarComponent } from './layout/components/navbar/navbar.component';
import { FootbarComponent } from './layout/components/footbar/footbar.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CsrfInterceptor } from './core/interceptors/csrf.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { JWTInterceptor } from './core/interceptors/jwt.interceptor';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { AccessDeniedComponent } from './core/pages/access-denied/access-denied.component';
import { MaintenanceComponent } from './core/pages/maintenance/maintenance.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AccessDeniedComponent,
    MaintenanceComponent,
    LayoutComponent,
    NavbarComponent,
    FootbarComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CsrfInterceptor,
    //   multi: true
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
