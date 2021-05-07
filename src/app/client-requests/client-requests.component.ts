import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {DatabaseService} from '../database.service';
import {Observable} from 'rxjs';
import {Request} from '../models/request.model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-client-requests',
  templateUrl: './client-requests.component.html',
  styleUrls: ['./client-requests.component.css']
})
export class ClientRequestsComponent implements OnInit {

  requests: Observable<Request[]>
  editRequest: boolean = false;
  id: string = ''
  form = this.fb.group({
    productName: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private dbService: DatabaseService) { }

  ngOnInit(): void {
    let order: string = localStorage.getItem('userCourse')
    let orderId = order.split('')
    orderId.forEach(item=>{
      if(parseInt(item)) this.id += item
    })
    console.log(this.id)
    this.requests = this.dbService.getRequestsById(this.id)
  }

  clearForm() {
    this.form.reset()
  }

  addRequest(product: string) {
    this.dbService.addRequest(product, this.id, length)
  }

  deleteRequest(id: string) {
    this.dbService.deleteRequest(id)
  }
}
