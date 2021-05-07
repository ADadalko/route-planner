import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  view: string = 'clist'
  isLogged: string = '';
  root: string = '"root@sila.com"';
  store1: string = '"store1@sila.com"'
  store2: string = '"store2@sila.com"'
  store3: string = '"store3@sila.com"'
  store4: string = '"store4@sila.com"'
  store5: string = '"store5@sila.com"'
  store6: string = '"store6@sila.com"'
  store7: string = '"store7@sila.com"'
  store8: string = '"store8@sila.com"'
  store9: string = '"store9@sila.com"'
  store10: string = '"store10@sila.com"'
  store11: string = '"store11@sila.com"'

  form = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(13)]],
    password: ['', [Validators.required, Validators.minLength(9)]],
  });

  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit(): void {
    this.isLogged = localStorage.getItem('userCourse')
  }

  submitForm(email: string, password: string){
    this.loginService.signIn(email, password).then(()=>{
      window.location.reload()
      this.form.reset()
    })
  }

  logOut() {
    localStorage.removeItem('userCourse')
    window.location.reload()
  }
}
