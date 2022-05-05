import { FilmeDetalle } from './../interfaces/filmeDetalle';
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

  private miLista: Array<Filme> = [];

  get lista(): Array<Filme>{
    return [...this.miLista];
  }

  get historial(){
    this.borrarHistorialCaducado();
    return JSON.parse(localStorage.getItem("historial")!) || [];
  }
  aniadirFilme(film:Filme){
    this.miLista.push(film);
  }
  quitarFilme(film:Filme){
    this.miLista.forEach( (item, index) => {
      if(item === film) this.miLista.splice(index,1);
    });
  }
  quitarFilmeArray(film:Filme, lista:[]){
    lista.forEach( (item:Filme, index) => {
      if(item.id === film.id) lista.splice(index,1);
    });
  }
  crearSerie(iterator:any):Serie{
    let serie:Serie = {
      id: iterator["id"],
      fondo: urlBase + iterator["backdrop_path"],
      nombre: iterator["name"],
      poster: urlBase + iterator["poster_path"],
      anioSalida: iterator["first_air_date"],
      categoria: "serie"
    };
    return serie;
  }

  crearPelicula(iterator:any):Pelicula{
    let pelicula:Pelicula = {
      id: iterator["id"],
      fondo: urlBase + iterator["backdrop_path"],
      nombre: iterator["title"],
      poster: urlBase + iterator["poster_path"],
      anioSalida: iterator["release_date"],
      categoria: "pelicula"
    };
    return pelicula;
  }

  crearFilmeDetalle(filme:Filme,iterator:any):FilmeDetalle{
    let dur = iterator["runtime"] || iterator["episode_run_time"]
    let filmeDetalle:FilmeDetalle = {
      sinopsis     : iterator["overview"],
      country      : iterator["origin_country"] || iterator["production_countries"][0]["iso_3166_1"],
      generos      : iterator["genres"],
      duracion     : dur>60 ? Math.floor(dur/60) * 60 + dur%60 : dur,
      puntuacion   : iterator["vote_average"],
      director     : '',
      ...filme
    }
    return filmeDetalle;
  }

  getDirector(iterator:any):string{
    let director = iterator["crew"].filter(
      (element:any) => {
      return element["job"] == "Director"
    });
    console.log(director);
    return director[0]["name"];
  }
  borrarHistorialCaducado(){
    let historial = JSON.parse(localStorage.getItem("historial")!) || [];

    historial = historial.filter((element:any) => {
      var date = new Date();
      let historialFecha = new Date(element.fecha);
      var dateHour = new Date(
        historialFecha.getFullYear(),
        historialFecha.getMonth(),
        historialFecha.getDate(),
        historialFecha.getHours()+ 1);
      console.log(historial);
      console.log(element.busqueda);
      if(dateHour < date  ){
        console.log("eliminando");
        return false;
      }
      return true;
    });
    localStorage.setItem("historial",JSON.stringify(historial));
  }
  guardarHistorial(name:string){
    this.borrarHistorialCaducado();
    let historial = JSON.parse(localStorage.getItem("historial")!) || [];
    historial.unshift({
      busqueda: name,
      fecha: new Date()
    })
    localStorage.setItem("historial",JSON.stringify(historial.splice(0,5)));
  }
}
