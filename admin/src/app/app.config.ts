//app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {FormsModule} from '@angular/forms'
import { HttpClient, HttpClientModule, provideHttpClient,withFetch } from '@angular/common/http'
import { NgxTinymceModule } from 'ngx-tinymce';



import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

export const appConfig: ApplicationConfig = {



  providers: [
    provideRouter(routes),

    provideHttpClient(
      withFetch()),
    FormsModule,
    HttpClientModule,
    HttpClient,
    NgbPaginationModule,

  ]

};
