import { Injectable } from '@angular/core';
//accedemos a la carpeta de angularfirestore sistema de colleciones para crearlas y subirlas
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
//la idea es que respete la siguiente interfaz
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  // definimos una coleccion de usuarios PRIVADA
  //va a ser una collecion firestore
  //respetara la estructura de datos de la interfaz de usuarios
  private usuariosCollection: AngularFirestoreCollection<Usuario>

  constructor(private database: AngularFirestore) { 
    this.usuariosCollection = this.database.collection<Usuario>('usuarios');
  }
}
