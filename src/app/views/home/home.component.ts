import { PeliculasService } from './../../shared/services/peliculas.service';
import { BuscadorComponent } from './../buscador/buscador.component';
import { Serie } from './../../shared/interfaces/serie';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PeliculasAPIService } from 'src/app/shared/services/peliculas-api.service';
import * as globals from 'src/app/views/globals'
import { Pelicula } from 'src/app/shared/interfaces/pelicula';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public peliculaSlider: Pelicula[] = [];
  public serieSlider: Serie[] = [];
  public urlBase: string = globals.urlBase;

  constructor(
    private router: Router,
    private peliculasService: PeliculasService,
    private peliculasAPIService: PeliculasAPIService) {

   }

  ngOnInit(): void {
    this.recuperarPeliculasPopulares();
  }
  private recuperarPeliculasPopulares():void{
    this.peliculasAPIService.mostrarPeliculasPopulares().subscribe(
      (data) =>{
        for (const iterator of data["results"]) {
          this.peliculaSlider.push(this.peliculasService.crearPelicula(iterator))
        }
      }
    );

    this.peliculasAPIService.mostrarSeriesPopulares().subscribe(
      (data) =>{
        for (const iterator of data["results"]) {
          this.serieSlider.push(this.peliculasService.crearSerie(iterator));
        }
      }
    );
  }

}
