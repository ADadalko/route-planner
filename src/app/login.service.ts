import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  constructor(public firebaseAuth: AngularFireAuth, private db: AngularFirestore) {}

  async signIn(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res=>{
        try {
          localStorage.setItem('userCourse', JSON.stringify(res.user.email))
        }catch (e) {
          console.log(e)
        }
      }).catch((error)=>{
        alert('Ошибка аутентификации')
      })
  }
}
