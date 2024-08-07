import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Action } from 'rxjs/internal/scheduler/Action';
import { map } from 'rxjs';

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
   obtenerProducto(){
    //snapshotChanges -> toma una captura del estado de los datos
    //pipe -> funciona como una tuberia que retorna el nuevo arreglo de datos
    //map -> "mapea" o recorre esa nueva informacion
    //a -> resguarda la nueva informacion y la envia 
    return this.productosCollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
   }
   //editar productos
   //eliminar productos
}
