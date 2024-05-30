import { Component } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Sesion } from 'src/app/models/sesion';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {
  hide=true

  public guardar: Sesion[];

  constructor(){
    this.guardar = [
      {          
        uid:"",
        email:"pepe@gmail.com",
        password:"pepe123"
      },
      {
        uid:"",
        email:"oreo@gmail.com",
        password:"oreo123"
      }

    ]
  }

}
