import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [
    `
    .heroes__container{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .heroe__card{
      width: 20%;
      max-width: 200px;
      min-width: 150px;
      margin: 10px;
    }
    `
  ]
})
export class HeroeTarjetaComponent implements OnInit {

  @Input() listadoHeroes?: Heroe[];

  constructor() { }

  ngOnInit(): void {
  }

}
