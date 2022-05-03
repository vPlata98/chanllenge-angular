import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { max, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasAPIService {

  baseURLPopulares: string = "https://api.themoviedb.org/3/discover/";
  baseURLBusqueda : string = "https://api.themoviedb.org/3/search/";
  baseURLDetalle  : string = "https://api.themoviedb.org/3/";
  baseURLCreditos : string = "https://api.themoviedb.org/3/";
  pagina          : number = 1;
  constructor(private httpClient: HttpClient) {

  }
  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-')
    );
  }

  public mostrarPeliculasPopulares(): Observable<any>{
    var date = new Date();
    var dateMon = this.formatDate(new Date(date.getFullYear(), date.getMonth() -2,date.getDay() ));

    return this.httpClient.get<any>(
      this.baseURLPopulares + 'movie?api_key=c6ae695f9781fa411c0b2970dda2f11c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&primary_release_date.gte='+ dateMon);
  }


  public mostrarSeriesPopulares(): Observable<any>{
    var date = new Date();
    var dateMon = this.formatDate(new Date(date.getFullYear(), date.getMonth() -2,date.getDay() ));
    return this.httpClient.get<any>(
      this.baseURLPopulares +
      'tv?api_key=c6ae695f9781fa411c0b2970dda2f11c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&first_air_date.gte='+ dateMon);
  }

  public busquedaPeliculas(nombre:string): Observable<any>{
    var query = nombre.replace(" ","%20");
    return this.httpClient.get<any>(
      this.baseURLBusqueda + 'movie?api_key=c6ae695f9781fa411c0b2970dda2f11c&language=en-US&query='
      + query + '&page='+ this.pagina +'&include_adult=false');
  }

  public busquedaSeries(nombre:string): Observable<any>{
    var query = nombre.replace(" ","%20");
    return this.httpClient.get<any>(
      this.baseURLBusqueda + 'tv?api_key=c6ae695f9781fa411c0b2970dda2f11c&language=en-US&query='
      + query + '&page='+ this.pagina +'&include_adult=false');

  }

  public busquedaPelicula(id: number): Observable<any>{
    return this.httpClient.get<any>(
      `${this.baseURLDetalle}movie/${id}?api_key=c6ae695f9781fa411c0b2970dda2f11c&language=en-US`
    );
  }

  public busquedaSerie(id: number): Observable<any>{
    return this.httpClient.get<any>(
      `${this.baseURLDetalle}tv/${id}?api_key=c6ae695f9781fa411c0b2970dda2f11c&language=en-US`
    );
  }

  public busquedaCreditosPelicula(id: number): Observable<any>{
    return this.httpClient.get<any>(
      `${this.baseURLCreditos}movie/${id}/credits?api_key=c6ae695f9781fa411c0b2970dda2f11c&language=en-US`
    )
  }

  public busquedaCreditosSerie(id: number): Observable<any>{
    return this.httpClient.get<any>(
      `${this.baseURLCreditos}tv/${id}/credits?api_key=c6ae695f9781fa411c0b2970dda2f11c&language=en-US`
    )
  }

  public incrementarPagina(){
    this.pagina += 1
  }

  public decrementarPagina(){
    this.pagina -= 1
  }

  public reiniciarPagina(){
    this.pagina = 1
  }




}
