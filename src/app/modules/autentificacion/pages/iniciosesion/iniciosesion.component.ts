import { Component } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {
  hide = true
  //######################## LOCAL
  //agrego una propiedad publica del tipo arreglo para guardar la coleccion
  // public guardar: Usuario[];
  //inicio la propiedad para guardar la coleccion de informacion del usuario
  // constructor() {
  //   this.guardar = [
  //     {
  //       uid: "",
  //       nombre: "pepe",
  //       apellido: "perez",
  //       email: "pepe@gmail.com",
  //       rol: "administrador",
  //       password: "pepe123"
  //     },
  //     {
  //       uid: "",
  //       nombre: "morena",
  //       apellido: "torres",
  //       email: "morena@gmail.com",
  //       rol: "administrador",
  //       password: "morena123"
  //     },
  //     {
  //       uid: "",
  //       nombre: "val",
  //       apellido: "coassin-fernandez",
  //       email: "vala@gmail.com",
  //       rol: "administrador",
  //       password: "val123"
  //     }
  //   ]
  // }
  //############################### FIN LOCAL

  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ) { }

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
  async iniciosesion() {
    //#########################LOCAL
    //   let emailcorrecto = false; //declaro variable email en falso
    //   let passwordcorrecta = false;  //declaro variable contraseña en falso
    //   //creo una repetitiva para comparar el arreglo de los usuarios guardados con lo que ingreso el usuario
    //   for (let i = 0; i < this.guardar.length; i++) {
    //     const usuariolocal = this.guardar[i]
    //     if (usuariolocal.email === this.usuarios.email && usuariolocal.password === this.usuarios.password) {
    //       //si el email y contraseña que ingreso es igual al que tenia guardado las variables pasan a ser true
    //       emailcorrecto = true; 
    //       passwordcorrecta = true;

    //     } else if (usuariolocal.email === this.usuarios.email) {
    //       //si el email es correcto la variable email pasa a ser true
    //       emailcorrecto = true;

    //     } else if (usuariolocal.password === this.usuarios.password) {
    //       //si la contraseña es correcta la variable contraseña pasa a ser true
    //       passwordcorrecta = true

    //     }
    //   }
    //   if (emailcorrecto && passwordcorrecta) {
    //     //si ambas variables son true muestra esto
    //     alert("los datos son correctos")

    //   } else if (emailcorrecto) {
    //     //si email es true la contraseña es incorrecta
    //     alert("la contraseña es incorrecta")

    //   } else if (passwordcorrecta) {
    //     //si la contraseña es correcta el email es incorrecto
    //     alert("el email es incorrecto")

    //   } else {
    //     //si ninguna variable es true email y contraseña son incorrectas
    //     alert("el email y contraseña son incorrectas")

    //   }
    //######################FIN LOCAL
    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password

    }

    try{
      //obtenemos el usuario desde la BD -> cloud firestore
      const usuarioBD = await this.servicioAuth.obtenerUsuario(credenciales.email);

      // !: si es diferente
      //.empty -> metodo de firebase para marcar algo vacio
      if (!usuarioBD || usuarioBD.empty) {
        alert('correo electronico no registrado')
        this.limpiarinput();
        return
      }

      //primer documento (registro) en la coleccion de usuarios que se obtiene desde la consulta.
      const usuarioDoc = usuarioBD.docs[0]

      //extraer los datos del documento en forma de un objeto y se especifica como del tipo
      // "Usuario" -> haciendo referencia a nuestra interfaz de usuario. 
      const usuarioData = usuarioDoc.data() as Usuario

      //hash de la contraseña ingresada por el usuario
      const hashedPassword = CryptoJS.SHA256(credenciales.password).toString();

      if (hashedPassword !== usuarioData.password) {
        alert("Contraseña incorrecta");

        this.usuarios.password = '';
        return;
        
      }

      
      const res = await this.servicioAuth.iniciarsesion(credenciales.email, credenciales.password)
      .then(res => {
        alert("se ha logueado con exito :) ")
        
        this.servicioRutas.navigate(['/inicio'])
      })
      .catch(err => {
        alert("hubo un problema al iniciar sesion :( " + err)

        this.limpiarinput()
      })

    }catch(error){
      this.limpiarinput();
    }

   
  }
  //funcion para limpiar los inputs
  limpiarinput() {
    const inputs = {
      email: this.usuarios.email = '',
      password: this.usuarios.password = ''
    }
  }
}
