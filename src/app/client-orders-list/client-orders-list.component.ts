import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../database.service';
import {Observable} from 'rxjs';
import {Order} from '../models/order.model';

@Component({
  selector: 'app-client-orders-list',
  templateUrl: './client-orders-list.component.html',
  styleUrls: ['./client-orders-list.component.css']
})
export class ClientOrdersListComponent implements OnInit {

  orders: Observable<Order[]>

  constructor(private dbService: DatabaseService) { }

  ngOnInit(): void {
    let order: string = localStorage.getItem('userCourse')
    let orderId = order.split('')
    let id = ''
    orderId.forEach(item=>{
      if(parseInt(item)) id += item
    })
    this.orders = this.dbService.getOrdersById(id)
  }

}
