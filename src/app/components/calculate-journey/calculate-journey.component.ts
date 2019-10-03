import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FileValidator} from './file-input-validator';
import { isNullOrUndefined} from 'util';
import { CalculateService } from 'src/app/services/calculate.service';
import { viaje } from 'src/app/models/viaje';
import { DomSanitizer } from '@angular/platform-browser';
import {saveAs as importedSaveAs} from "file-saver";


@Component({
  selector: 'app-calculate-journey',
  templateUrl: './calculate-journey.component.html',
  styleUrls: ['./calculate-journey.component.css']
})
export class CalculateJourneyComponent implements OnInit {
  CalculateForm: FormGroup;
  submitted = false; 
  validartext = false;
  infoviaje: viaje = new viaje();
  private fileText;
  private url;

  constructor(private formBuilder: FormBuilder, private _CalcService: CalculateService,private sanitizer: DomSanitizer) { }

  //Metodo encargado de invocar el servicio o api para el calculo de los viajes
  Calcular(){
    this.submitted = true;
    if (this.CalculateForm.invalid) {return;}
    this.infoviaje.usuario = this.CalculateForm.controls.Usuario.value;
    this.infoviaje.info = this.fileText;
    this._CalcService.CalculateJourney(this.infoviaje)
    .subscribe(data =>{
      debugger;
      if (data != null){
        //Validar resultado
        if(data.resultado){
          var mensajes: string = "";
          for (var i = 0; i < data.case.length; i ++){
            mensajes = mensajes + data.case[i];
          }
          //Creamos el nombre del archivo y realizamos descarga
          var fileName = "lazy_loading_example_output.txt"
          this.saveTextAsFile(mensajes, fileName);
        }else{
          alert(data.mensaje);
        }
      }
    },
    error => {
      console.log(error);
      alert('Error inesperado, comuniquese con el administrador');
    }
    );
  }

  //Metodo para escribir el archivo de texto de descarga 
  saveTextAsFile (data, filename){
    const blob = new Blob([data], { type: 'text/plain' });
    importedSaveAs(blob, filename);
    alert("Exito: Analisis completado!");
  }  

  //Metodo encargado de leer el contenido del archivo de texto.
  fileUpload(event) {
    var reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    let file = event.target.files[0];
    var me = this;
    reader.onload = function () {
      me.fileText = reader.result;
    }
  }

  //Inicializar y crear el form para el reactive form
  ngOnInit() {
    this.CalculateForm = this.formBuilder.group({
      Usuario: ['', Validators.required],
      archivo: ['', FileValidator.validate]
    });
  }

  get f() { return this.CalculateForm.controls; }
}
