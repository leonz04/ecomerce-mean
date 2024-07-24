import { NgModule } from '@angular/core';
import { NgxTinymceModule } from 'ngx-tinymce';

@NgModule({
  imports: [
    NgxTinymceModule.forRoot({
      baseURL: '../../../../assets/tinymce/'  // Ajusta la ruta según la ubicación de tus archivos de TinyMCE
    }),
    // Otros módulos globales importados aquí
  ],
  exports: [
    NgxTinymceModule,
    // Exporta los módulos que desees utilizar en otros lugares de la aplicación
  ]
})
export class CoreModule { }
