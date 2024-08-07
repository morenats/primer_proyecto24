import { Component } from '@angular/core';
import { Producto } from "src/app/models/producto";
import { CrudService } from "../../services/crud.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  //crear coleccion de productos del tipo producto -> lo definimos como un array
  coleccionProductos: Producto[] = [];

  //definimos formuolario paras los productos
  //atributos alfanumericos (string) se inicializan con comillas simples
  //atributos numericos (number) se inicializan con cero ('0')
  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required)
  })

  constructor(public servicioCrud: CrudService){
  }

  ngOnInit(): void{
    //suscribe -> notifica constantemente los cambios actuales del sistema 
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      //guarda la informacion recibida como un nuevo "producto" a la coleccion
      this.coleccionProductos = producto;
    })
  }

  async agregarProducto(){
    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        //idproducto no se toma porque es generado por la BD y no por el usuario
        idProducto:'',
        //el resto es tomado con informacion ingresada por el usuario
        nombre:this.producto.value.nombre!,
        precio:this.producto.value.precio!,
        descripcion: this.producto.value.descripcion!,
        categoria: this.producto.value.categoria!,
        imagen: this.producto.value.imagen!,
        alt: this.producto.value.alt!
      }

      await this.servicioCrud.crearProducto(nuevoProducto)
      .then(producto => {
        alert("ha agregado un nuevo producto con exito")
      })
      .catch(error => {
        alert("hubo un problema al agregar un nuevo producto producto")
      })
    }
  }
}
