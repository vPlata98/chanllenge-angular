import { PeliculasAPIService } from './../../shared/services/peliculas-api.service';
import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/shared/interfaces/pelicula';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.scss']
})
export class PeliculasComponent implements OnInit {
  public peliculas: any;
  public urlBase: string = "https://image.tmdb.org/t/p/w500";
  constructor(private peliculasAPIService: PeliculasAPIService) {

   }

  ngOnInit(): void {
    this.recuperarPeliculasPopulares();
  }

  private recuperarPeliculasPopulares():void{
    this.peliculasAPIService.mostrarPeliculasPopulares().subscribe(
      (data) =>{
        console.log(data);
        this.peliculas = data;
      }
    )
  }

  public mostrarTitulo(nombre: string): void{
     alert("Nombre de pelicula:" + nombre);
  }
}
