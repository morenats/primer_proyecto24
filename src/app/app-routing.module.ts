import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './modules/inicio/pages/inicio/inicio.component';

const routes: Routes = [
  //ruta comun que te lleva a un componente
  {
    path:"",component:InicioComponent
  },
  //carga perezosa que es una ruta que te lleva un modulo especifico
  //loadchildren:indica que habra una ruta hija
  //()=>import:funcion flecha que importa desde la ruta
  //.them funcion asincronica del tipo promesa
  {
    path:"",loadChildren:()=>import('./modules/inicio/inicio.module').then(m=>m.InicioModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
