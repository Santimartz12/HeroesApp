import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
})
export class ListadoComponent implements OnInit {

  heroes : Heroe[] = [];

  constructor(private heroesServices: HeroesService) { }

  ngOnInit(): void {

    this.heroesServices.getHeroes().subscribe(resp => {
      this.heroes = resp;
    })

  }

}
