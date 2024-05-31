import { Component } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {
  hide=true

  public guardar: Usuario[];

  constructor(){
    this.guardar = [
      {            
        uid:"",
        nombre:"pepe",
        apellido:"perez",
        email:"pepe@gmail.com",
        rol:"administrador",
        password:"pepe123"
      },
      {            
        uid:"",
        nombre:"morena",
        apellido:"torres",
        email:"morena@gmail.com",
        rol:"administrador",
        password:"morena123"
      },

    ]
  }

  usuarios: Usuario = {
    uid: '',
    nombre:'',
    apellido:'',
    email:'',
    rol:'',
    password:'',
  }

  iniciosesion() {
    for (let i = 0; i < this.guardar.length; i++) {
      if (this.guardar[i].email===this.usuarios.email && this.guardar[i].password===this.usuarios.password) {
        alert("los datos son correctos")
      } else {
        if (this.guardar[i].email!==this.usuarios.email && this.guardar[i].password===this.usuarios.password) {
          alert("el email es incorrecto")
        } else {
          if (this.guardar[i].password!==this.usuarios.password) {
            alert("la contraseña es incorrecta")
          }
        }
      }
    }
  }

}
