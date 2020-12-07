import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';




@Injectable({
  providedIn: 'root'
})
export class LoginService {




  constructor(private authFire: AngularFireAuth) { }

  emailPassword(email, password){


    return this.authFire.signInWithEmailAndPassword(email, password);


  }

  logout(){



   return this.authFire.signOut();
  }
}
