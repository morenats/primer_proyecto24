import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module'; //archivo de rutas del modulo

import { AdminComponent } from './pages/admin/admin.component'; //componente de vista
import { TableComponent } from './components/table/table.component'; //componente local

//componente de material
import { MatIconModule } from '@angular/material/icon';
//paqueteria de formularios y formularios reactivos de ANGULAR
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    AdminComponent,
    TableComponent,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
