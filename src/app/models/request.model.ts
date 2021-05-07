import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import {Place} from './place.model';

export interface Request {
  id: number,
  dbid: string,
  date: Timestamp,
  product: string,
  place: Place
}
