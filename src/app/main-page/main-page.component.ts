import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Auto} from '../models/auto.model';
import {Place} from '../models/place.model';
import {Good} from '../models/good.model';
import {Driver} from '../models/driver.model';
import {DatabaseService} from '../database.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  autos: Observable<Auto[]>;
  places: Observable<Place[]>;
  goods: Observable<Good[]>;
  drivers: Observable<Driver[]>;
  selectedDriver: Driver;
  selectedPlace: Place;
  selectedGood: Good;
  selectedAuto: Auto;

  constructor(private dbService: DatabaseService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    document.getElementById('imgToTransform').style.width = '20%';
    this.autos = this.dbService.getAutos();
    this.places = this.dbService.getPlaces();
    this.goods = this.dbService.getGoods();
    this.drivers = this.dbService.getDrivers();
  }

  transformImg() {
    if (document.getElementById('imgToTransform').style.width == '20%') {
      document.getElementById('imgToTransform').style.width = '50%';
    } else {
      document.getElementById('imgToTransform').style.width = '20%';
    }
  }

  addOrder() {
    if (this.selectedAuto.liftCapacity < this.selectedGood.weight) {
      alert(`Грузоподъемность выбранного авто (${this.selectedAuto.liftCapacity} кг) меньше, чем вес груза (${this.selectedGood.weight} кг)`);
    } else {
      this.dbService.addOrder(this.selectedGood, this.selectedPlace, this.selectedDriver, this.selectedAuto, this.selectedAuto.rate * this.selectedPlace.distance);
    }
  }
}
