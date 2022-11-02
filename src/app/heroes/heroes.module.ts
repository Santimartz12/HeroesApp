import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroeTarjetaComponent } from './components/tarjeta/heroe-tarjeta.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';



@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    HomeComponent,
    ListadoComponent,
    HeroeComponent,
    HeroeTarjetaComponent,
    ImagenPipe,
    ConfirmarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    HeroesRoutingModule,
  ]
})
export class HeroesModule { }
