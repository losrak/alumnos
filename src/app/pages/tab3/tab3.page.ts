import { Component } from '@angular/core';
import { SchoolService } from 'src/app/services/school.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  forma: FormGroup;
  titulo: string;
  id: number;
  photo: string;

  imageResponse: any;
  options: any;

  constructor( private formBuilder: FormBuilder, 
        private escuelaService: SchoolService,
        private alertController: AlertController,
        private imgPicker: ImagePicker,
        private router: Router,
        private activeRoute: ActivatedRoute) {
          this.titulo = 'Nuevo alumno';
          this.crearFormulario();
          this.limpiar();
          this.activeRoute.params
            .subscribe( params => {
              if(params['id']){
                this.titulo = 'Editar alumno';
                this.id = parseInt(params['id']);
                this.iniciarFormulario(this.id);
              }
          });

  }

  agregar(){
    console.log(this.forma.value);
    if(this.forma.invalid){
      Object.values(this.forma.controls).forEach(control => {
        //pregunta si control es una instancia de FormGroup para los objetos hijos
        // console.log(control)
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(control => control.markAsTouched() );
        }else{
          control.markAsTouched();
        }
      });
      return;
    }
    let message = 'Se anexó nueva información';
    if(!this.id){
      this.escuelaService.crearAlumno(this.forma.value);
      this.limpiar();
    }
    else{      
      this.escuelaService.actualizarAlumno(this.forma.value);
      message = 'Se actualizó con éxito';
    }
    

    Swal.fire({
      icon: 'success',
      title: message
    })

  }

  cancelar(){
    console.log("se canceló");
    this.router.navigateByUrl('/tabs/tab2');
  }

  crearFormulario(){
    this.forma = this.formBuilder.group({
      id: '',
      nombre: ['', [Validators.required, Validators.pattern('^[A-Za-z\\s]+$')] ],
      edad: ['', Validators.required],
      sexo: ['hombre', Validators.required],
      nacimiento: ['2010-01-01', Validators.required],
      foto: ['', Validators.required]
    });
  }

  iniciarFormulario(id: number){
    let alumno = this.escuelaService.getAlumno(id);
    this.forma.reset({
      id: alumno.id,
      nombre: alumno.nombre,
      sexo: alumno.sexo,
      nacimiento: alumno.nacimiento,
      edad: alumno.edad,
      foto: alumno.foto
    });
  }

  limpiar(){
    this.forma.reset({
      id: '',
      nombre: '',
      sexo: 'hombre',
      nacimiento: '2010-01-01',
      edad: '',
      foto: ''
    });
  }
  

  getImage() {
    this.options = {
      maximumImagesCount: 1,
      width: 200,
      quality: 25,
      outputType: 1
    };
    this.imageResponse = [];
    this.imgPicker.getPictures(this.options).then( (results) => {
      for (var i = 0; i < results.length; i++) {
        this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
      }    
      this.forma.patchValue({
        foto: this.imageResponse[0]
      })
    }, (err) => {
      alert(err);
    });

  }

}
