import { Injectable } from '@angular/core';
//servicio de autentificaion de firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //referenciar auth de firebase para inicializarlo
  constructor(public auth:AngularFireAuth) { }

  //funcion para tomar uid

  //funcion para el registro
  registrar(email:string, password: string){
    //retorna nueva informacion de email y contraseña
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  //funcion para inicio de sesion

  iniciarsesion(email:string, password: string){
    //validar email y la contraseña
    return this.auth.signInWithEmailAndPassword(email,password)
  }

  //funcion para cerrar sesion
  cerrarsesion(){
    //devolver promesa vacia
    return this.auth.signOut();
  }
  //funcion para 
}
