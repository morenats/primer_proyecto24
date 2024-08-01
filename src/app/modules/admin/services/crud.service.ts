import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //definimos colleccion para los productos de la web del tipo producto
  private productosCollection: AngularFirestoreCollection<Producto>

  constructor(private database: AngularFirestore) {
    //referenciamos coleccion productos y sera subida como "producto " a Firebase
    this.productosCollection = database.collection('producto');
   }

   //creamos metodo para crear productos
   crearProducto(producto: Producto){
    return new Promise(async (resolve, reject) => {
      try{
        //creamos numero identificativo para el producto en la base de datos
        const idProducto = this.database.createId();

        //asignamos ID creando al atributo idProducto de la interfaz "Producto"
        producto.idProducto = idProducto;

        const resultado = await this.productosCollection.doc(idProducto).set(producto);

        resolve(resultado)
      }catch(error){
        reject(error);
      }
    })
   }
   //obtener productos
   //editar productos
   //eliminar productos
}
