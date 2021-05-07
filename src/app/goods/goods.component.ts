import {Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {DatabaseService} from '../database.service';
import {Good} from '../models/good.model';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {

  goods: Observable<Good[]>;
  editGood: boolean = false;
  @ViewChild('type') type: ElementRef;
  @ViewChild('weight') weight: ElementRef;
  form = this.fb.group({
    name: ['', [Validators.required]],
    weight: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
  });

  constructor(private fb: FormBuilder, private dbService: DatabaseService) { }

  ngOnInit(): void {
    this.goods = this.dbService.getGoods()
  }

  clearForm(): void {
    this.form.reset();
  }

  addGood(name: string, weight: string, type: string) {
    this.dbService.addGood(name, parseInt(weight), type)
    this.form.reset()
  }

  deleteGood(name: string) {
    this.dbService.deleteGood(name)
  }

  editGoodInfo(name: string, weight: string, type: string, previousName: string) {
    this.dbService.editGood(name, parseInt(weight), type, previousName)
    this.form.reset()
    this.editGood = false;
  }

  setType() {
    let weight: number = parseInt(this.weight.nativeElement.value);
    if(weight < 100) this.type.nativeElement.value = 'Малогабаритный'
    if(weight > 100 && weight < 500) this.type.nativeElement.value = 'Среднегабаритный'
    if(weight > 500) this.type.nativeElement.value = 'Крупногабаритный'
  }
}
