import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
//SERVICIO DE AUTENTIFICACION
import { AuthService } from '../../services/auth.service';
//servicio de firestore
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
//servicio de rutas que otorga angular
import { Router } from '@angular/router';

//importamos paqueteria de criptacion 
import * as CryptoJS from 'crypto-js';
//importamos paqueteria de Sweetalert para alertas personalidad
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  //este hide es para el input de contraseña 
  hide = true;

  //IMPORTACION DEL MODELO/INTERFAZ
  usuarios: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: '',
  }
  //CREAR UNA COLLECCION QUE SOLO RECIBE OBJETOS DEL TIPO USUARIOS
  coleccionusuarios: Usuario[] = [];

  constructor(
    public servicioAuth: AuthService, //metodo de autentificacion
    public servicioFirestore: FirestoreService, //vincula UID con la collecion
    public servicioRutas: Router// metodo de navegacion
  ) { }

  //FUNCION PARA REGISTRO
  async registrar() {
    //credenciales = informacion que ingrese el usuario
    //##################LOCAL
    //   const credenciales = {
    //     uid: this.usuarios.uid,
    //     nombre: this.usuarios.nombre,
    //     apellido: this.usuarios.apellido,
    //     email: this.usuarios.email,
    //     rol: this.usuarios.rol,
    //     password: this.usuarios.password
     //enviamos los nuevos regristros por medio del metodo push a la coleccion
  // this.coleccionusuarios.push(credenciales)

  // alert("se registro correctamente")
  //##############################FIN LOCAL

  //por consola
  // console.log(credenciales);
  // console.log(this.coleccionusuarios)


    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password
    }
    //constante "res" = resguarda una respuesta
    const res = await this.servicioAuth.registrar(credenciales.email, credenciales.password)
    //el metodo then nos devuelve la respuesta esperada por la promesa
    .then(res =>{
      Swal.fire({
        title: "Buen trabajo!",
        text: "Ha agregado un usuario con exito :)",
        icon: "success"
      });

      //accedemos al sercicio de rutas -> metodo navigate
      //metodo NAVIGATE = perimite dirigirnos a diferentes vistas
      this.servicioRutas.navigate(['/inicio'])
    })

    .catch(error=> {
      Swal.fire({
        title: "Ho no!",
        text: "Hubo un problema al registrar un nuevo usuario :(",
        icon: "error"
      });
    })

    const uid = await this.servicioAuth.obtenerUid();

    this.usuarios.uid = uid

    //ENCRIPTACION DE LA CONTRASEÑA DE USUARIO
    //SHA-256 es un algoritmo de hashing seguro que toma una entrada (contraseña) y produce una cadena de caracteres HEXADECIMALES que representa su HASH
    //el toString(): convierte el resultado del hash en una cadena de caracteres legible
    this.usuarios.password=CryptoJS.SHA256(this.usuarios.password).toString();

    //llamamos a la funcion para guardar la informacion del usuario en la coleccion
    this.guardarUsuario();

    //llamamos a la funcion para limpiar el formulario
    this.limpiarinput()
  }

  //funcion para agregar nuevo usuario
  async guardarUsuario(){
    this.servicioFirestore.agregarUsuario(this.usuarios, this.usuarios.uid)
    .then(err => {
      console.log(this.usuarios)
    })
    .catch(err => {
      console.log('Error =>', err)
    })
  }

  //funcion para limpiar los inputs
  limpiarinput() {
    const inputs = {
      uid: this.usuarios.uid = '',
      nombre: this.usuarios.nombre = '',
      apellido: this.usuarios.apellido = '',
      email: this.usuarios.email = '',
      rol: this.usuarios.rol = '',
      password: this.usuarios.password = ''
    }
  }
}
