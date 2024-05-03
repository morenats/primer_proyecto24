import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
//vista-pagina
import { InicioComponent } from './pages/inicio/inicio.component';
//componentes locales
import { CardsComponent } from './components/cards/cards.component';
//componentes de material
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    InicioComponent,
    CardsComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    MatCardModule,
    MatButtonModule
  ],
  exports:[
    MatButtonModule,
    MatCardModule
  ]
})
export class InicioModule { }
