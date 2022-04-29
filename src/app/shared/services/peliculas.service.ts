import { Filme } from './../interfaces/filme';
import { Injectable } from '@angular/core';
import { urlBase } from 'src/app/views/globals';
import { Pelicula } from '../interfaces/pelicula';
import { Serie } from '../interfaces/serie';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor() { }

  crearSerie(iterator:any):Serie{
    let serie:Serie = {
      id: iterator["id"],
      fondo: urlBase + iterator["backdrop_path"],
      nombre: iterator["name"],
      poster: urlBase + iterator["poster_path"],
      anioSalida: iterator["first_air_date"]
    };
    return serie;
  }

  crearPelicula(iterator:any):Pelicula{
    let pelicula:Pelicula = {
      id: iterator["id"],
      fondo: urlBase + iterator["backdrop_path"],
      nombre: iterator["title"],
      poster: urlBase + iterator["poster_path"],
      anioSalida: iterator["release_date"]
    };
    return pelicula;
  }
}
