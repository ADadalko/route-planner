import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../database.service';
import {Observable} from 'rxjs';
import {Request} from '../models/request.model';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requests: Observable<Request[]>;

  constructor(private dbService: DatabaseService) { }

  ngOnInit(): void {
    this.requests = this.dbService.getRequests()
  }


  deleteRequest(dbid: string) {
    this.dbService.deleteRequest(dbid)
  }
}
