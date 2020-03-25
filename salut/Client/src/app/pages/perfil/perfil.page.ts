import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { PerfilService } from 'src/app/services/perfil.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public perfil = {
    id: 0,
    nom: '',
    cognoms: '',
    data_n: null,
    genere: 'D',
    alcada: null,
    pes: null,
    g_sanguini: null,
    d_organs: 0,
    allergies: [],
    patologies: []
    
  }
  public allergies: FormGroup;
  private allergiesCount: number = 1;

  constructor(public perfilService: PerfilService, private formBuilder: FormBuilder) { 

    this.allergies = formBuilder.group({
      allergia1: ['', Validators.required]
    });

  }

  addControl(){
    this.allergiesCount++;
    this.allergies.addControl('al·lergia' + this.allergiesCount, new FormControl('', Validators.required));
  }

  removeControl(control){
    this.allergies.removeControl(control.key);
  }

  ngOnInit() {
    

  }

  enviar()
  {
    console.log("Enviar formulari dades mèdiques.")
    this.perfilService.enviar(this.perfil).subscribe((res: HttpResponse<any>)=>{
      console.log("Resp:");
      console.log(res);
    });
  }

}
