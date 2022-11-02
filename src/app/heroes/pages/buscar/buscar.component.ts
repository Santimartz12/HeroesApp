import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles:[
    `
    .container__buscador{
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    `
  ]
})
export class BuscarComponent implements OnInit {

  termino : string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado! : Heroe | undefined;
  encontrado: boolean = true;


  constructor( private heroesServices : HeroesService, private router: Router) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesServices.getSugerencias(this.termino).
    subscribe(heroes => {
      if(heroes.length > 0 ){
        this.encontrado = true;
        return this.heroes = heroes;
      }
      this.heroes = [];
      return this.encontrado = false;
    })
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ){

    if(!event.option.value){
      this.heroeSeleccionado = undefined;
      return ;
    }

    const heroe : Heroe = (event.option.value);
    this.termino = heroe.superhero;

    this.heroesServices.getHeroePorId( heroe.id! ).
    subscribe( heroe => {
      if(heroe){this.heroeSeleccionado = heroe}
      this.router.navigate(['/heroes', heroe.id]);
    })

  }

}

