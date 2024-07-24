/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideTinymce } from 'ngx-tinymce';



bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

    // bootstrapApplication(AppComponent, {
    //   providers: [provideTinymce({baseURL: '//cdn.tiny.cloud/1/no-api-key/tinymce/6/'})]
    // });
