import {Driver} from './driver.model';
import {Auto} from './auto.model';
import {Good} from './good.model';
import {Place} from './place.model';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Order {
  driver: Driver,
  good: Good,
  auto: Auto,
  place: Place,
  price: number,
  date: Timestamp,
  id: string
}
