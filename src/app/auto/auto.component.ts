import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Auto} from '../models/auto.model';
import {DatabaseService} from '../database.service';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})
export class AutoComponent implements OnInit {

  autos: Observable<Auto[]>;
  editAuto: boolean = false;
  form = this.fb.group({
    model: ['', [Validators.required]],
    rate: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    quantity: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    liftCapacity: ['', [Validators.required, Validators.min(1), Validators.max(1000)]]
  });

  constructor(private fb: FormBuilder, private dbService: DatabaseService) { }

  ngOnInit(): void {
    this.autos = this.dbService.getAutos()
  }

  addAuto(model: string, rate: string, quantity: string, liftCapacity: string) {
    this.dbService.addAuto(model, parseInt(rate), parseInt(quantity), parseInt(liftCapacity))
    this.form.reset()
  }

  deleteAuto(previousModel: string) {
    this.dbService.deleteAuto(previousModel)
  }

  editAutoInfo(model: string, rate: string, quantity: string, liftCapacity: string, previousModel: string) {
    this.dbService.editAuto(model, parseInt(rate), parseInt(quantity), parseInt(liftCapacity), previousModel)
    this.form.reset()
    this.editAuto = false;
  }

  clearForm() {
    this.form.reset()
  }

  increaseQuantity(quantity: number, model: string) {
    this.dbService.increaseQuantity(quantity, model)
  }

  decreaseQuantity(quantity: number, model: string) {
    this.dbService.decreaseQuantity(quantity, model)
  }
}
