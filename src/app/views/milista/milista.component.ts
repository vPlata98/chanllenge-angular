import { FilmeDetalle } from './../../shared/interfaces/filmeDetalle';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Filme } from 'src/app/shared/interfaces/filme';

@Component({
  selector: 'app-milista',
  templateUrl: './milista.component.html',
  styleUrls: ['./milista.component.scss']
})
export class MilistaComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  miLista : Array<FilmeDetalle> = [];
  rating  : number = 0;
  filme!   : Filme;
  @ViewChild("modal") modal!: ElementRef<HTMLDivElement>;
  @ViewChild("overlay") overlay!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    let item = localStorage.getItem("milista")
    if (item) {
      this.miLista = JSON.parse(item);
    }else{
      this.miLista = [];
    }
  }

  showModal(puntuacion:number, item:Filme):void{
    this.rating = puntuacion;
    this.filme = item;
    // this.elementRef.nativeElement.getElementById(item.id).style.display = "unset";
    // this.elementRef.nativeElement.getElementsByClassName("modal")[0].style.visibility = "hidden";
    this.modal.nativeElement.style.display = "unset";
    this.overlay.nativeElement.style.display = "unset";

  }

  hideModal(){
    this.modal.nativeElement.style.display = "none";
    this.overlay.nativeElement.style.display = "none";
  }

}
