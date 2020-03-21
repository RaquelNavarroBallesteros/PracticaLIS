import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { PerfilService } from 'src/app/services/perfil.service';

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
    alergies: [],
    patologies: []
  }
  constructor(public perfilService: PerfilService) { }

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
