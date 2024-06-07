import { Component } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {
  hide = true
  //######################## LOCAL
  //agrego una propiedad publica del tipo arreglo para guardar la coleccion
  public guardar: Usuario[];
  //inicio la propiedad para guardar la coleccion de informacion del usuario
  constructor() {
    this.guardar = [
      {
        uid: "",
        nombre: "pepe",
        apellido: "perez",
        email: "pepe@gmail.com",
        rol: "administrador",
        password: "pepe123"
      },
      {
        uid: "",
        nombre: "morena",
        apellido: "torres",
        email: "morena@gmail.com",
        rol: "administrador",
        password: "morena123"
      },
      {
        uid: "",
        nombre: "val",
        apellido: "coassin-fernandez",
        email: "vala@gmail.com",
        rol: "administrador",
        password: "val123"
      }
    ]
  }
  //############################### FIN LOCAL

  //####################### INGRESADO
  //importo la interfaz de usuarios para comparar lo que ingreso el usuario en el form
  usuarios: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: '',
  }

  //########################## FIN INGRESADO

  //creo una funcion para comparar cuando el usuario envie su email y contraseña
  iniciosesion() {
    //creo una repetitiva para comparar el arreglo de los usuarios guardados con lo que ingreso el usuario
    let emailcorrecto = false; //declaro variable email en falso
    let passwordcorrecta = false;  //declaro variable contraseña en falso
    for (let i = 0; i < this.guardar.length; i++) {
      const usuariolocal = this.guardar[i]
      if (usuariolocal.email === this.usuarios.email && usuariolocal.password === this.usuarios.password) {
        //si el email y contraseña que ingreso es igual al que tenia guardado las variables pasan a ser true
        emailcorrecto = true; 
        passwordcorrecta = true;
        
      } else if (usuariolocal.email === this.usuarios.email) {
        //si el email es correcto la variable email pasa a ser true
        emailcorrecto = true;
        
      } else if (usuariolocal.password === this.usuarios.password) {
        //si la contraseña es correcta la variable contraseña pasa a ser true
        passwordcorrecta = true
        
      }
    }
    if (emailcorrecto && passwordcorrecta) {
      //si ambas variables son true muestra esto
      alert("los datos son correctos")
      
    } else if (emailcorrecto) {
      //si email es true la contraseña es incorrecta
      alert("la contraseña es incorrecta")
      
    } else if (passwordcorrecta) {
      //si la contraseña es correcta el email es incorrecto
      alert("el email es incorrecto")
      
    } else {
      //si ninguna variable es true email y contraseña son incorrectas
      alert("el email y contraseña son incorrectas")
      
    }
  }
}
