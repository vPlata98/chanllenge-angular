import { HttpClient, HttpParams } from '@angular/common/http';
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
  apiKey          : string = "c6ae695f9781fa411c0b2970dda2f11c";
  commonParams    : HttpParams = new HttpParams()
    .set("api_key",this.apiKey)
    .set("language", "en-US")
    .set("include_adult",false);

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
    let params = this.commonParams
      .set("primary_release_date.gte",dateMon)
      .set("include_video", false)
      .set("sort_by","popularity.desc")
      .set("with_watch_monetization_types","flatrate")
      .set("page",1);
    return this.httpClient.get<any>(
      this.baseURLPopulares + 'movie', {params});
  }


  public mostrarSeriesPopulares(): Observable<any>{
    var date = new Date();
    var dateMon = this.formatDate(new Date(date.getFullYear(), date.getMonth() -2,date.getDay() ));
    let params = this.commonParams
      .set("first_air_date.gte",dateMon)
      .set("include_video", false)
      .set("sort_by","popularity.desc")
      .set("with_watch_monetization_types","flatrate")
      .set("page",1);
    return this.httpClient.get<any>(
      this.baseURLPopulares + 'tv', {params});
  }

  public busquedaPeliculas(nombre:string): Observable<any>{
    let params = this.commonParams
      .set("query",nombre)
      .set("page",this.pagina);
    return this.httpClient.get<any>(
      this.baseURLBusqueda + 'movie',{params});
  }

  public busquedaSeries(nombre:string): Observable<any>{
    let params = this.commonParams
      .set("query",nombre)
      .set("page",this.pagina);
    return this.httpClient.get<any>(
      this.baseURLBusqueda + 'tv',{params});

  }

  public busquedaPelicula(id: number): Observable<any>{
    let params =this.commonParams
      .delete("include_adult");
    return this.httpClient.get<any>(
      `${this.baseURLDetalle}movie/${id}`,{params}
    );
  }

  public busquedaSerie(id: number): Observable<any>{
    let params =this.commonParams
      .delete("include_adult");
    return this.httpClient.get<any>(
      `${this.baseURLDetalle}tv/${id}`,{params}
    );
  }

  public busquedaCreditosPelicula(id: number): Observable<any>{
    let params =this.commonParams
      .delete("include_adult");
    return this.httpClient.get<any>(
      `${this.baseURLCreditos}movie/${id}/credits?`, {params}
    )
  }

  public busquedaCreditosSerie(id: number): Observable<any>{
    let params =this.commonParams
      .delete("include_adult");
    return this.httpClient.get<any>(
      `${this.baseURLCreditos}tv/${id}/credits`, {params}
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
