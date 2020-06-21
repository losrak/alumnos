import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolService } from 'src/app/services/school.service';
import { Alumno } from 'src/app/models/alumno.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor( private router: Router,
    public escuelaService: SchoolService ) {}

  agregar(){
    this.router.navigateByUrl('/tabs/tab3');
  }

  editar(alumno: Alumno){
    this.router.navigateByUrl(`/tabs/tab2/editar/${alumno.id}`);
  }

  borrar(alumno: Alumno){
    this.escuelaService.borrarAlumno(alumno);
  }

}
