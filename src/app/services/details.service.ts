import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private asf: AngularFirestore) { }

  addDetails(detail){

   return this.asf.collection('Detail').add(detail);
  }


  getDetails(){

    return this.asf.collection('Detail').snapshotChanges();
  }


  getDetailsPagnitator(value){

    return this.asf.collection('Detail', ref => ref.limit(value)).snapshotChanges();
  }
}
