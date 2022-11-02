import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    .centrar{
      text-align: center;
    }
    .contenedor__nuevo{
      width: 95%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      gap: 40px;
    }
    .elementos__nuevos{
      height: calc( 90vh - 150px );
      width: 60%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .container__column{
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .contenedor__inputs{
      display: flex;
      gap: 40px;
    }
    .input__nuevo{
      width:100%;
    }
    .nueva__img{
      width: 30%;
      height: calc( 90vh - 150px );
    }
    .img__new{
      width: 75%;
    }
    .container__btn{
      display: grid;
      grid-template-columns: 20% 80%;
      gap: 10px;
    }
    `
  ]



})
export class AgregarComponent implements OnInit {

  infoTitulo: string = "Nuevo Heroe ";

  publishers = [
    {
      id: "DC Comics",
    },
    {
      id: "Marvel Comics",
    }
  ]

  heroe: Heroe = {
    superhero: "",
    alter_ego: "",
    characters: "",
    first_appearance: '',
    alt_img: '',
    publisher: Publisher.DCComics,
  }

  constructor(private heroesServices: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private info: MatSnackBar,
    private dialogo: MatDialog) { }

  ngOnInit(): void {

    if (this.router.url.includes('editar')) {
      this.infoTitulo = "Editar ";
      this.activatedRoute.params.pipe(
        switchMap(({ id }) => { return this.heroesServices.getHeroePorId(id) })
      ).subscribe(heroe => this.heroe = heroe);
    }

  }

  guardar() {

    if (this.heroe.superhero.trim().length === 0) {
      return
    }

    if (this.heroe.id) {
      this.heroesServices.actualizarHeroe(this.heroe).subscribe(
        heroe => {
          this.router.navigate(['/heroes/listado']);
          this.mostrarinfo("Actualizado Correctamente");
        }
      )
    } else {
      this.heroesServices.agregarHeroe(this.heroe).subscribe(
        heroe => {
          this.router.navigate(['/heroes/listado'])
          this.mostrarinfo("Agregado Correctamente");
        }
      )
    }
  }

  eliminar() {

    const dialog = this.dialogo.open(ConfirmarComponent, {
      width: '300px',
      data: { ...this.heroe }

    });

    dialog.afterClosed().subscribe((resp) => {
      if(resp == true){
        this.heroesServices.borrarHeroe(this.heroe.id!).subscribe(resp => {
          this.router.navigate(['/heroes/listado']);
        })
      }
    })





  }

  mostrarinfo(mensaje: string) {
    this.info.open(mensaje, "Cerrar", {
      duration: 1500,
    });
  }



}
