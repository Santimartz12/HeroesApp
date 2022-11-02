import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
    .heroe__page__container{
      display: flex;
      height: calc(100vh - 90px);
    }

    .heroe_container{
      height: calc(100vh - 90px);      
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
    }

    .heroe__info{
      margin-top: 120px;
      justify-content: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .ubicacion__btn{
      width: 150px;
      margin-left: 10px;
    }

    .titulo__hero{
      text-align: center;
      margin-top: 50px;
      font-size: 60px;
      font-weight: bold;
    }

    .boton__back{
      margin-left: 5px;
      font-size: 18px;
    }

    .list__info{
      align-items: center;
      justify-content: center;
      margin-top: 40px;
    }

    .subtitles__info{
      margin-right: 5px;
      color: #f44336;
    }

    .info__item{
      font-size: 19px ;
      display: flex;
    }
    `
  ]
})
export class HeroeComponent implements OnInit {

  heroe?: Heroe;

  constructor(private activateRouter: ActivatedRoute,
    private heroesServices: HeroesService, private router : Router) { }

  ngOnInit(): void {

    this.activateRouter.params.pipe(
      switchMap(({ id }) => this.heroesServices.getHeroePorId(id)),
      tap(console.log)
    ).subscribe((resp) => {
      this.heroe = resp;
    })

    //Personalmente es mas facil hacerla con el de abajo pero pues esto sirvio asi que lo dejo



    // Por si me parece mas facil esto

    // this.activateRouter.params.
    // subscribe(({ id }) => {
    //   this.heroesServices.getHeroePorId(id).
    //   subscribe(( resp )=> {
    //       this.heroe = resp;
    //     }
    //   )
    // });
  }


  retroceder(){
    this.router.navigate(['/heroes/listado']);
  }


}
