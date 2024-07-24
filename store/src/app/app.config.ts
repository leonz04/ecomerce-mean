import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {FormsModule} from '@angular/forms'
import { HttpClient, HttpClientModule } from '@angular/common/http'

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes),
    provideClientHydration(),
    FormsModule,
    HttpClientModule,
    HttpClient,

  ]

};
