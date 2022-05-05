import { PeliculasService } from './../../shared/services/peliculas.service';
import { Filme } from './../../shared/interfaces/filme';
import { Serie } from './../../shared/interfaces/serie';
import { Pelicula } from 'src/app/shared/interfaces/pelicula';
import { PeliculasAPIService } from 'src/app/shared/services/peliculas-api.service';
import { Component, ComponentFactoryResolver, EventEmitter, OnInit, Output } from '@angular/core';
import * as globals from 'src/app/views/globals'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {
  public busquedaPeliculas: Pelicula[] = [];
  public busquedaSeries   : Serie[] = [];
  public busqueda         : Filme[] = [] ;

  public numeroPaginas    : number = 0;
  public static buscar    : string = '';
  public urlBase: string = globals.urlBase;
  ngForm!: FormGroup;
  constructor(
    private routeAc: ActivatedRoute,
    private peliculaService: PeliculasService,
    public peliculaServiceAPI: PeliculasAPIService,
    private route: Router) { }


  get historial(){
    return this.peliculaService.historial;
  }
  ngOnInit(): void {
    // console.log(this.routeAc.snapshot.paramMap.get("buscar"));
    console.log("Inicializar" + BuscadorComponent.buscar + this.route.url);
    // BuscadorComponent.buscar = this.routeAc.snapshot.paramMap.get("buscar")!;
    if (this.route.url.split(";")[0] != "/buscador") {
      BuscadorComponent.buscar = '';
    }
    if(BuscadorComponent.buscar){
      console.log("unavez");
      this.recuperarBusqueda(BuscadorComponent.buscar);
    }
  }

  private recuperarBusqueda(name: string):void{
    this.vaciarBusqueda();
    this.peliculaServiceAPI.busquedaPeliculas(name).subscribe(
      (data) =>{
        for (const iterator of data["results"]) {
          this.busquedaPeliculas.push(this.peliculaService.crearPelicula(iterator))
        }
        this.numeroPaginas = data["total_pages"];
        this.peliculaServiceAPI.busquedaSeries(name).subscribe(
          (data) =>{
            for (const iterator of data["results"]) {
              this.busquedaSeries.push(this.peliculaService.crearSerie(iterator));
            }
            this.numeroPaginas = Math.max( data["total_pages"], this.numeroPaginas );
            this.prepararBusqueda();
            console.log("entrando" + this.busqueda[0]);
            // window.location.reload();
          }
        )
      }
    )
  }
  onSubmit(name:string):void{
    if(BuscadorComponent.buscar != name){
      this.peliculaServiceAPI.reiniciarPagina();
    }
    BuscadorComponent.buscar = name;
    this.peliculaService.guardarHistorial(name);
    if(this.route.url.split(";")[0] !== "/buscador"){
      this.route.navigate(['/buscador']);
      return;
    }
    this.recuperarBusqueda(name);
    console.log("dos veces" + BuscadorComponent.buscar);
  }
  vaciarBusqueda():void{
    this.busquedaPeliculas = [];
    this.busquedaSeries = [];
    this.busqueda = [];
    this.numeroPaginas = 1;
    // BuscadorComponent.buscar = "";
  }
  prepararBusqueda():void{
    let len = Math.max(this.busquedaPeliculas.length,
      this.busquedaSeries.length);
    for (let index = 0; index < len; index++) {
      // console.log("revision de true" + this.busquedaPeliculas[index]);
      if(this.busquedaPeliculas[index] !== undefined){
        this.busqueda.push(this.busquedaPeliculas[index] );
      }
      if(this.busquedaSeries[index] !== undefined){
        this.busqueda.push(this.busquedaSeries[index] );
      }
    }
  }
  avanzarPagina():void{
    this.peliculaServiceAPI.incrementarPagina();

    this.onSubmit(BuscadorComponent.buscar);
  }

  retrocederPagina():void{
    this.peliculaServiceAPI.decrementarPagina();
    this.onSubmit(BuscadorComponent.buscar);
  }

}
