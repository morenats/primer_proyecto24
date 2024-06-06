import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

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
    nombre:'',
    apellido:'',
    email:'',
    rol:'',
    password:'',
  }
  //CREAR UNA COLLECCION QUE SOLO RECIBE OBJETOS DEL TIPO USUARIOS
  coleccionusuarios: Usuario[] = [];

  //FUNCION PARA REGISTRO
  registrar(){
    const credenciales = {
      uid: this.usuarios.uid,
      nombre: this.usuarios.nombre,
      apellido: this.usuarios.apellido,
      email: this.usuarios.email,
      rol: this.usuarios.rol,
      password: this.usuarios.password
    }
    //enviamos los nuevos regristros por medio del metodo push a la coleccion
    this.coleccionusuarios.push(credenciales)

    alert("se registro correctamente")

    //llamamos a la funcion para limpiar el formulario
    this.limpiarinput()

    //por consola
    // console.log(credenciales);
    // console.log(this.coleccionusuarios)
  }
  limpiarinput(){
    const inputs = {
      uid: this.usuarios.uid ='',
      nombre: this.usuarios.nombre = '',
      apellido: this.usuarios.apellido ='',
      email: this.usuarios.email = '',
      rol: this.usuarios.rol = '',
      password: this.usuarios.password = ''
    }
  }
}
