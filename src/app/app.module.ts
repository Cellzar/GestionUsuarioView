import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './components/auth/auth.module';
import { MaterialModule } from './modules/material.module';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './components/home/home.module';
import { PersonasModule } from './components/personas/personas.module';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { LoadingInterceptor } from './interceptors/loading/loading.interceptor';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    HomeModule,
    PersonasModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [CookieService,
              { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
              { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
