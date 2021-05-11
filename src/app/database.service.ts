import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Driver} from './models/driver.model';
import {Observable} from 'rxjs';
import {Good} from './models/good.model';
import {Place} from './models/place.model';
import {Auto} from './models/auto.model';
import {Order} from './models/order.model';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import OrderByDirection = firebase.firestore.OrderByDirection;
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import {Request} from './models/request.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFirestore) {
  }

  addDriver(firstName: string, secondName: string, thirdName: string, photo: string, age: number, experience: number): void {
    this.db.collection<Driver>('drivers').doc(secondName).set({
      age: age,
      experience: experience,
      firstName: firstName,
      photoUrl: photo,
      secondName: secondName,
      thirdName: thirdName
    }, {merge: true});
  }

  getDrivers(): Observable<Driver[]> {
    return this.db.collection<Driver>('drivers').valueChanges();
  }

  deleteDriver(secondName: string) {
    this.db.collection<Driver>('drivers').doc(secondName).delete();
  }

  editDriver(firstName: string, secondName: string, thirdName: string, photo: string, age: number, experience: number, previousName: string) {
    this.db.collection<Driver>('drivers').doc(previousName).delete().then(() => {
      this.db.collection<Driver>('drivers').doc(secondName).set({
        age: age,
        experience: experience,
        firstName: firstName,
        photoUrl: photo,
        secondName: secondName,
        thirdName: thirdName
      }, {merge: true});
    });
  }

  getGoods(): Observable<Good[]> {
    return this.db.collection<Good>('goods').valueChanges();
  }

  addGood(name: string, weight: number, type: string): void {
    this.db.collection<Good>('goods').doc(name).set({
      name: name,
      weight: weight,
      type: type
    }, {merge: true});
  }

  static add(x: string, y: string): string;
  static add(x: number, y: number): number;

  static add(x: any, y: any): any {
    return x + y;
  }


  deleteGood(name: string) {
    this.db.collection<Good>('goods').doc(name).delete();
  }

  editGood(name: string, weight: number, type: string, previousName: string) {
    this.db.collection<Good>('goods').doc(previousName).delete().then(() => {
      this.db.collection<Good>('goods').doc(name).set({
        name: name,
        weight: weight,
        type: type
      }, {merge: true});
    });
  }

  getPlaces(): Observable<Place[]> {
    return this.db.collection<Place>('places', ref => ref.orderBy('id')).valueChanges();
  }

  addAuto(model: string, rate: number, quantity: number, liftCapacity: number) {
    this.db.collection<Auto>('autos').doc(model).set({
      liftCapacity: liftCapacity,
      model: model,
      rate: rate,
      quantity: quantity
    }, {merge: true});
  }

  deleteAuto(model: string) {
    this.db.collection<Auto>('autos').doc(model).delete();
  }

  editAuto(model: string, rate: number, quantity: number, liftCapacity: number, previousModel: string) {
    this.db.collection<Auto>('autos').doc(model).delete().then(() => {
      this.db.collection<Auto>('autos').doc(model).set({
        liftCapacity: liftCapacity,
        model: model,
        rate: rate,
        quantity: quantity
      }, {merge: true});
    });
  }

  getAutos(): Observable<Auto[]> {
    return this.db.collection<Auto>('autos').valueChanges();
  }

  increaseQuantity(quantity: number, model: string) {
    if (quantity != 100) {
      this.db.collection<Auto>('autos').doc(model).update({
        quantity: quantity + 1
      });
    }
  }

  decreaseQuantity(quantity: number, model: string) {
    if (quantity != 1) {
      this.db.collection<Auto>('autos').doc(model).update({
        quantity: quantity - 1
      });
    }
  }

  addOrder(good: Good, place: Place, driver: Driver, auto: Auto, price: number) {
    if (auto.quantity > 0) {
      let id = this.db.createId();
      this.db.collection<Order>('orders').doc(id).set({
        id: id,
        date: Timestamp.now(),
        auto: auto,
        driver: driver,
        good: good,
        place: place,
        price: price
      }, {merge: true}).then(() => {
        this.db.collection<Auto>('autos').doc(auto.model).update({
          quantity: auto.quantity - 1
        });
      });
    alert('Заказ принят')
    }else{
      alert('Все машины данной модели заняты')
    }
  }

  getOrders(): Observable<Order[]> {
    return this.db.collection<Order>('orders').valueChanges();
  }

  deleteOrder(id: string) {
    this.db.collection<Order>('orders').doc(id).delete();
  }

  getOrdersByDate(ascending: boolean): Observable<Order[]> {
    let how: OrderByDirection = 'desc'
    if(ascending) how = 'asc'
    return this.db.collection<Order>('orders', ref => ref.orderBy('date', how)).valueChanges();
  }

  getOrdersBySum(ascending: boolean): Observable<Order[]> {
    let how: OrderByDirection = 'desc'
    if(ascending) how = 'asc'
    return this.db.collection<Order>('orders', ref => ref.orderBy('price', how)).valueChanges();
  }

  getOrdersByWeight(ascending: boolean): Observable<Order[]> {
    let how: OrderByDirection = 'desc'
    if(ascending) how = 'asc'
    return this.db.collection<Order>('orders', ref => ref.orderBy('good.weight', how)).valueChanges();
  }

  getOrdersWithFilters(key: string, symbol: string, value): Observable<Order[]>{
    let symb: WhereFilterOp = '=='
    switch (symbol){
      case '==':
        symb = symbol
        break
      case '>=':
        symb = symbol
        break
      case '<=':
        symb = symbol
        break
      case '>':
        symb = symbol
        break
      case '<':
        symb = symbol
        break
      case '!=':
        symb = symbol
        break
      default:
        symb = '=='
        break
    }
    if(parseInt(value)) return this.db.collection<Order>('orders', ref => ref.where(key, symb, parseInt(value))).valueChanges()
    else return this.db.collection<Order>('orders', ref => ref.where(key, symb, value)).valueChanges()
  }

  getRequests(): Observable<Request[]> {
    return this.db.collection<Request>('requests').valueChanges()
  }

  getOrdersById(id: string): Observable<Order[]> {
    return this.db.collection<Order>('orders', ref => ref.where('place.id', '==', parseInt(id))).valueChanges()
  }

  getRequestsById(id: string): Observable<Request[]> {
    return this.db.collection<Request>('requests', ref => ref.where('id', '==', parseInt(id))).valueChanges()
  }

  addRequest(productName: string, pid: string, length: number) {
    let place: Place;
    this.db.collection<Place>('places', ref => ref.where('id', '==', parseInt(pid))).get().toPromise().then(data=>{
      data.forEach(data=>{
        place = data.data()
      })
    }).then(()=>{
      let dbid = this.db.createId()
      this.db.collection<Request>('requests').doc(dbid).set({
        dbid: dbid,
        date: Timestamp.now(),
        id: parseInt(pid),
        place: place,
        product: productName
      })
    })
  }

  deleteRequest(dbid: string) {
    this.db.collection<Request>('requests').doc(dbid).delete()
  }
}
