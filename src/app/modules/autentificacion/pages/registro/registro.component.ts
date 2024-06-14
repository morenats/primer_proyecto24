import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
//SERVICIO DE AUTENTIFICACION
import { AuthService } from '../../services/auth.service';
//servicio de firestore
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
//servicio de rutas que otorga angular
import { Router } from '@angular/router';



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
      alert("ha agregado un usuario con exito :")

      //accedemos al sercicio de rutas -> metodo navigate
      //metodo NAVIGATE = perimite dirigirnos a diferentes vistas
      this.servicioRutas.navigate(['/inicio'])
    })

    .catch(error=> {
      alert("hubo un problema al registrar un nuevo usuario :")
    })

    const uid = await this.servicioAuth.obtenerUid();

    this.usuarios.uid = uid

    //llamamos a la funcion
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
