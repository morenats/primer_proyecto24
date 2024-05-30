export interface Usuario {
    uid:string | any; //atributos de tipo any pueden recibir valores de tipo indefinidos
    nombre:string;
    apellido:string;
    email:string;
    rol: string;
    password: string;
}

