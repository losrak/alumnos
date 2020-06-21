import { Component } from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';
import { SchoolService } from 'src/app/services/school.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  results: Alumno[] = [];

  constructor( private escuelaService: SchoolService,
    private router: Router ) {
    
  }

  buscar(termino: string){
    this.results = this.escuelaService.buscarAlumnos(termino);
    console.log(this.results)
  }

  editar(alumno: Alumno){
    this.router.navigateByUrl(`/tabs/tab2/editar/${alumno.id}`);
  }

  borrar(){

  }

  agregar(){}

}
