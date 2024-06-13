import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//importamos solo componentes globales para que me permita exportar los componentes
import { SharedModule } from './modules/shared/shared.module';

//VINCULACIONES/IMPORTACIONES CON FIREBASE 
import {environment} from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire/compat'; //es para el cloud firestore
import {AngularFireAuthModule} from '@angular/fire/compat/auth' //es para la autentificacion
import {AngularFireStorageModule} from '@angular/fire/compat/storage' //es para la BD de archivos e imagenes      

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //COMPONENTES GLOBALES
    SharedModule,       
    //inicializa firebase en nuestro proyecto
    AngularFireModule.initializeApp(environment.firebaseConfig),
    //autentificacion
    AngularFireAuthModule,
    //storage -> BD de imagenes
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
