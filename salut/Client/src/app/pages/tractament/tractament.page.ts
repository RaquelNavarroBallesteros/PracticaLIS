import { Component, OnInit } from '@angular/core';
import { TractamentService } from 'src/app/services/tractament.service';

@Component({
  selector: 'app-tractament',
  templateUrl: './tractament.page.html',
  styleUrls: ['./tractament.page.scss'],
})
export class TractamentPage implements OnInit {

  public tractament = {
    id: 0,
    perfil_id: 1,
    nom: '',
    desc: '',
    medicaments: [],
  }

  constructor(public perfilService: TractamentService) { }

  ngOnInit() 
  {
  }

  get()
  {

  }

  add()
  {

  }

  update()
  {
    
  }

}
