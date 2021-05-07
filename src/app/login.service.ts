import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public firebaseAuth: AngularFireAuth) { }

  async signIn(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res=>{
        localStorage.setItem('userCourse', JSON.stringify(res.user.email))
      }).catch((error)=>{
        alert(error)
      })
  }
}
