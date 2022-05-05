import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  constructor() { }

  rating: number = 0;
  @Output("rating") onRating: EventEmitter<number>= new EventEmitter();

  ngOnInit(): void {
  }

  onStarClick(event:any):void{
    console.log(event);
    console.log(event.target!.attributes.id.nodeValue);
    this.rating = event.target!.attributes.id.nodeValue;
    this.onRating.emit(this.rating);
  }

}
