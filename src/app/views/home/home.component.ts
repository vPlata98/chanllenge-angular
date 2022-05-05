import { PeliculasService } from './../../shared/services/peliculas.service';
import { Serie } from './../../shared/interfaces/serie';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PeliculasAPIService } from 'src/app/shared/services/peliculas-api.service';
import { Pelicula } from 'src/app/shared/interfaces/pelicula';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private pelicula: Pelicula[] = [];
  private serie: Serie[] = [];


  constructor(
    private router: Router,
    private peliculasService: PeliculasService,
    private peliculasAPIService: PeliculasAPIService) {

   }

  ngOnInit(): void {
    console.log(this.peliculasService.localItem("homePelicula",24))
    if(!this.peliculasService.localItem("homePelicula",24)[0]["busqueda"]
      && !this.peliculasService.localItem("homeSerie",24)[0]["busqueda"] ){
        this.recuperarPeliculasPopulares();
      }
  }
  get peliculaSlider():any{
    return this.pelicula.length != 0 ? [...this.pelicula] :
      this.peliculasService.localItem("homePelicula",24)[0].busqueda;
  }
  get serieSlider():any{
    return this.pelicula.length != 0 ? [...this.serie] :
      this.peliculasService.localItem("homeSerie",24)[0].busqueda;
  }
  private recuperarPeliculasPopulares():void{
    this.peliculasAPIService.mostrarPeliculasPopulares().subscribe(
      (data) =>{
        for (const iterator of data["results"]) {
          let peli = this.peliculasService.crearPelicula(iterator)
          this.pelicula.push(peli)
        }
        this.peliculasService.guardarLocal("homePelicula",this.pelicula,24);
      }
    );

    this.peliculasAPIService.mostrarSeriesPopulares().subscribe(
      (data) =>{
        for (const iterator of data["results"]) {
          let serie = this.peliculasService.crearSerie(iterator)
          this.serie.push(serie);
        }
        this.peliculasService.guardarLocal("homeSerie",this.serie,24);
      }
    );
  }

}
