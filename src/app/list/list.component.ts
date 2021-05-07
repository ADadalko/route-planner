import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../database.service';
import {Observable} from 'rxjs';
import {Order} from '../models/order.model';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  orders: Observable<Order[]>;
  ascending: boolean = true;
  selectedKey: string = '';
  selectedSymbol: string = '';
  selectedValue: string = '';

  constructor(private dbService: DatabaseService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.orders = this.dbService.getOrders()
  }

  deleteOrder(id: string) {
    this.dbService.deleteOrder(id)
  }

  sortByDate() {
    this.orders = this.dbService.getOrdersByDate(this.ascending)
    this.ascending = !this.ascending
  }

  sortBySum() {
    this.orders = this.dbService.getOrdersBySum(this.ascending)
    this.ascending = !this.ascending
  }

  filterOrders(selectedKey: string, selectedSymbol: string, selectedValue: string) {
    if(!selectedKey || !selectedSymbol || !selectedValue) alert('Заполните форму для фильтрации до конца')
    else this.orders = this.dbService.getOrdersWithFilters(this.selectedKey, this.selectedSymbol, this.selectedValue)
  }

  sortByWeight() {
    this.orders = this.dbService.getOrdersByWeight(this.ascending)
    this.ascending = !this.ascending
  }

  clearFilters() {
    this.orders = this.dbService.getOrders()
  }
}
