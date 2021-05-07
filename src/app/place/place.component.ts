import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Place} from '../models/place.model';
import {DatabaseService} from '../database.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  places: Observable<Place[]>
  constructor(private dbService: DatabaseService) { }

  ngOnInit(): void {
    this.places = this.dbService.getPlaces()
  }

}
