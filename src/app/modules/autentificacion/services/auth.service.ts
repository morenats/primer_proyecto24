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
  async obtenerUid(){
    //nos va a generar una promesa y la constante la va a capturar 
    const user = await this.auth.currentUser;
    //si el usuario no respeta la estructura de la interfaz
    // o si tuvo problemas para el registro -->ej.mal internet
    if (user == null) {
      return null
    } else{
      return user.uid
    }
  }

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
}
