import { FilmeDetalle } from './../../shared/interfaces/filmeDetalle';
import { PeliculasService } from './../../shared/services/peliculas.service';
import { PeliculasAPIService } from 'src/app/shared/services/peliculas-api.service';
import { Filme } from './../../shared/interfaces/filme';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-filme-detalle',
  templateUrl: './filme-detalle.component.html',
  styleUrls: ['./filme-detalle.component.scss']
})
export class FilmeDetalleComponent implements OnInit {

  constructor(
    private peliculasService: PeliculasService,
    private peliculasAPIService:PeliculasAPIService,
    private route: ActivatedRoute) { }


  @ViewChild("seleccionado") seleccionado!:ElementRef<HTMLSpanElement>;
  @ViewChild("noSeleccionado") noSeleccionado!:ElementRef<HTMLSpanElement>;

  id: number = 0;
  categoria: string ='';
  filme!: FilmeDetalle;
  director: string='';
  ngOnInit(): void {
    this.route.params.subscribe( params => {
      console.log(params);
      this.id = params["id"];
      this.categoria = params["categoria"];
      this.recuperarFilme();
    });
  }
  aniadirLista(event:MouseEvent){
    if(this.seleccionado.nativeElement.style.display == "none" || !this.seleccionado.nativeElement.style.display){
      this.seleccionado.nativeElement.style.display = "inline-block";
      this.noSeleccionado.nativeElement.style.display = "none";
      this.peliculasService.aniadirFilme(this.filme);
    }else{
      this.noSeleccionado.nativeElement.style.display = "inline-block";
      this.seleccionado.nativeElement.style.display = "none";
      this.peliculasService.quitarFilme(this.filme);
    }

    console.log(this.peliculasService.lista);
  }
  recuperarFilme(){
    if(this.categoria =="pelicula"){
      this.peliculasAPIService.busquedaPelicula(this.id).subscribe(
        (data)=>{
          this.filme =this.peliculasService.crearFilmeDetalle(
            this.peliculasService.crearPelicula(data),
            data);

        }
      )
      this.peliculasAPIService.busquedaCreditosPelicula(this.id).subscribe(
        (data) =>{
          this.filme.director = this.peliculasService.getDirector(data);
        }
      )
    }else{
      this.peliculasAPIService.busquedaSerie(this.id).subscribe(
        (data)=>{
          this.filme =this.peliculasService.crearFilmeDetalle(
            this.peliculasService.crearSerie(data),
            data);
        }
      )
      this.peliculasAPIService.busquedaCreditosSerie(this.id).subscribe(
        (data) =>{
          this.filme.director = this.peliculasService.getDirector(data);
        }
      )
    }
  }

}
