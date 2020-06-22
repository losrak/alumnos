
export class Alumno {
    id: number;
    nombre: string;
    edad: number;
    sexo: string;
    nacimiento: Date;
    foto: string;

    constructor(alumni: {
        nombre: string, 
        edad: number, 
        sexo: string, 
        nacimiento: Date,
        foto: string}){

            this.id = new Date().getTime();
            this.nombre = alumni.nombre;
            this.edad = alumni.edad;
            this.sexo = alumni.sexo;
            this.nacimiento = alumni.nacimiento;
            this.foto = alumni.foto;
        
    }
}