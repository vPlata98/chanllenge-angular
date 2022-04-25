import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/shared/interfaces/pelicula';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.scss']
})
export class PeliculasComponent implements OnInit {
  public peliculas: Array<Pelicula>;
  constructor() {
    this.peliculas = [
      {
        nombre: "star wars"
      },
      {
        nombre: "Indiana Jones"
      },
      {
        nombre: "Interstellar"
      }
    ];
   }

  ngOnInit(): void {
  }
  public mostrarTitulo(nombre: string): void{
     alert("Nombre de pelicula:" + nombre);
  }
}
