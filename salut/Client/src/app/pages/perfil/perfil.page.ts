import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public perfil = {
    nom: '',
    cognoms: '',
    data_n: null,
    genere: '',
    alcada: null,
    pes: null,
    g_sanguini: '',
    d_organs: null,
    alergies: [],
    patologies: []
  }
  constructor() { }

  ngOnInit() {
  }

  enviar()
  {
    console.log("Enviar formulari dades mèdiques.")
  }

}
