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
    id: 1,
    usuari_id: 1,
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

  ionViewWillEnter(){
    if (this.perfil.id != 0)
    {
      this.perfilService.obtenir(1).subscribe((res: PerfilSetResponse)=>{
      console.log(res.data)
      this.perfil.nom = res.data['Nom'];
      this.perfil.cognoms = res.data['Cognoms'];
      this.perfil.data_n = res.data['DataNaixement'].substring(0, 10);
      this.perfil.pes = res.data['Pes'];
      this.perfil.alcada = res.data['Alcada']
      this.perfil.genere = res.data['Genere']
    });
  }
  }

  addControl(){
    this.allergiesCount++;
    this.allergies.addControl('player' + this.allergiesCount, new FormControl('', Validators.required));
  }

  removeControl(control){
    this.allergies.removeControl(control.key);
  }

  ngOnInit() {
    //console.log("Enviar formulari dades mèdiques.")
  }

  enviar()
  {
    console.log("Enviar formulari dades mèdiques.")
    this.perfilService.enviar(this.perfil).subscribe((res: PerfilGetResponse)=>{
      if (res.correct)
      {
        // TODO: Show msg
        console.log("Data was saved")
      }
      else
      {
        // TODO: Show msg
        console.log("Error:" + res.msg)
      }
    });
  }

}

export class PerfilSetResponse {
  constructor(
      public serverStatus: number,
      public correct: boolean,
      public data: object,
      public msg: string,
  ) {}
}

export class PerfilGetResponse {
  constructor(
      public serverStatus: number,
      public correct: boolean,
      public msg: string,
  ) {}
}
