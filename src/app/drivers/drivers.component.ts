import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {DatabaseService} from '../database.service';
import {Observable} from 'rxjs';
import {Driver} from '../models/driver.model';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  drivers: Observable<Driver[]>;
  editDriver: boolean = false;
  form = this.fb.group({
    firstName: ['', [Validators.required]],
    secondName: ['', [Validators.required]],
    thirdName: ['', [Validators.required]],
    photoUrl: [''],
    age: ['', [Validators.required, Validators.min(18)]],
    experience: ['', [Validators.required, Validators.min(1)]]
  });

  constructor(private fb: FormBuilder, private dbService: DatabaseService) { }

  ngOnInit(): void {
    this.drivers = this.dbService.getDrivers();
  }

  clearForm(): void {
    this.form.reset();
  }

  addDriver(firstName: string, secondName: string, thirdName: string, photo: string, age: string, experience: string) {
    if (!photo) photo = 'https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png'
    this.dbService.addDriver(firstName, secondName, thirdName, photo, parseInt(age), parseInt(experience))
    this.form.reset()
  }

  deleteDriver(secondName: string) {
    this.dbService.deleteDriver(secondName)
  }

  editDriverInfo(firstName: string, secondName: string, thirdName: string, photo: string, age: string, experience: string, previousName: string) {
    this.dbService.editDriver(firstName, secondName, thirdName, photo, parseInt(age), parseInt(experience), previousName)
    this.form.reset()
    this.editDriver = false;
  }
}
