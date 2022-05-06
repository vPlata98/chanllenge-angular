import { Filme } from './../../shared/interfaces/filme';
import { PeliculasService } from './../../shared/services/peliculas.service';
import { Serie } from './../../shared/interfaces/serie';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
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
  private slideIndex: number = 0;
  private buttonClicked: boolean = false;
  filmeSlider!: Filme;
  constructor(
    private router: Router,
    private peliculasService: PeliculasService,
    private peliculasAPIService: PeliculasAPIService) {

   }
   @ViewChild("avanzar") avanzar : any;
   @ViewChild("retroceder") retroceder! : ElementRef<HTMLButtonElement>;
   ngAfterViewChecked(): void{
    if(this.buttonClicked){
      this.buttonClicked = false;
      return;
    }

    console.log()
    // console.log("El indice es:" + this.slideIndex)
  }
  ngOnInit(): void {
    this.plusDivs(1);
    this.carousel();
    console.log(this.peliculasService.localItem("homePelicula",24))
    if(this.peliculasService.localItem("homePelicula",24).length == 0){
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
  carousel() {
    setTimeout(() =>{
      this.plusDivs(1);
      this.carousel();
    },5000);
  }

  showDivs(n:number) {
    console.log(this.slideIndex);
    if (this.slideIndex > 4) {this.slideIndex = 1}
    if (this.slideIndex < 1) {this.slideIndex = 4} ;
    console.log(this.slideIndex)
    if(this.slideIndex == 1 || this.slideIndex == 2 ){
      this.filmeSlider = this.peliculaSlider[this.slideIndex-1];
    }
    else if(this.slideIndex == 3 || this.slideIndex == 4){
      this.filmeSlider = this.serieSlider[this.slideIndex-1];
    }
    console.log(this.slideIndex);
    // this.slideIndex +=n;
    console.log(this.filmeSlider);
  }

  plusDivs(n:number){
    this.showDivs(this.slideIndex += n);
  }

}
