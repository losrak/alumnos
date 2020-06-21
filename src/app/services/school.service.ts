import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  public alumnos: Alumno[] = [];

  constructor() { 
    this.cargarStorage();
  }

  borrarAlumno( alumnoBorrar: Alumno){
    this.alumnos = this.alumnos.filter( alumno => alumno.id !== alumnoBorrar.id)
    this.guardarStorage();
  }

  buscarAlumnos(s: string){
    let results = [];
    if(s.length > 0){
      results = this.alumnos.filter( alumno => {
        if(alumno.nombre.toLowerCase().indexOf(s.toLowerCase()) !== -1){
          return alumno;
        }
      })
    }
    return results;
  }

  guardarStorage(){
    localStorage.setItem('data', JSON.stringify(this.alumnos));
  }

  cargarStorage(){
    if(localStorage.getItem('data'))
      this.alumnos = JSON.parse(localStorage.getItem('data'));
  }

  crearAlumno(data: Alumno ){
    const nuevoAlumno = new Alumno(data);
    this.alumnos.push(nuevoAlumno);
    this.guardarStorage();
  }

  actualizarAlumno(alumno: Alumno){
    this.alumnos = this.alumnos.map( alumnoDB => {
      if(alumnoDB.id === alumno.id){
        console.log("entró")
        alumnoDB = alumno;
      }
      return alumnoDB;
    });
    console.log(this.alumnos);
    this.guardarStorage();

  }

  getAlumno(id: number){
    this.cargarStorage();
    let alumnoData: Alumno;
    this.alumnos.map( alumnoBD => {
      if(alumnoBD.id === id){
        alumnoData = alumnoBD;
      }
    })
    return alumnoData;
  }

}
