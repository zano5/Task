import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DetailsService } from 'src/app/services/details.service';
import { LoginService } from 'src/app/services/login.service';
import { Feature, MapboxService } from 'src/app/services/mapbox.service';
import { Detail } from 'src/model/detail';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  checkAddress ="";

  delivery = false;
  collect = true;
  coordinates : any;
  list : any;
  selectedAddress : string= "";
  lat: any;
  lng: any;
  error = '';
  submitted = false
  detail = {} as Detail;


  addresses =[];

  form: FormGroup;

  constructor(private router: Router,  fb: FormBuilder, private mapboxDao: MapboxService, private detailDao: DetailsService, private loginDao: LoginService) {


    this.form = fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      idNo: [0, Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      location: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

  }

  ngOnInit(): void {
  }



  goBack(){

    this.router.navigateByUrl('detail');
  }

  signOut(){

    this.loginDao.logout().then(() => {

      this.router.navigateByUrl('login');
    })

  }


  addressCheck(event){
    this.checkAddress = event.target.value;
    this.form.value['location'] = this.checkAddress;
    console.log("info",this.checkAddress);


}


search(event) {
  const searchTerm = event.target.value.toLowerCase();
  if (searchTerm && searchTerm.length > 0) {
    this.mapboxDao.search_word(searchTerm)
      .subscribe((features: Feature[]) => {
        this.coordinates = features.map(feat => feat.geometry)
        this.addresses = features.map(feat => feat.place_name)
        this.list = features;
        console.log(this.list)
      });
  } else {
    this.addresses = [];
  }
}


onSelect(address , i) {
  this.selectedAddress = address;
  //  selectedcoodinates=

  console.log("lng:" + JSON.stringify(this.list[i].geometry.coordinates[0]))
  console.log("lat:" + JSON.stringify(this.list[i].geometry.coordinates[1]))
  this.lng = JSON.stringify(this.list[i].geometry.coordinates[0])
  this.lat = JSON.stringify(this.list[i].geometry.coordinates[1])
  // this.user.coords = [this.lng,this.lat];
  console.log("index =" + i)
  console.log(this.selectedAddress)
  // this.user.address = this.selectedAddress;
  this.addresses = [];
}



submit() {
  this.submitted = true
  this.error = ''

  if (this.form.valid) {
    console.log(this.form.value)

   this.detail.province= this.form.value['province'];
   this.detail.name = this.form.value['name'];
   this.detail.surname = this.form.value['surname'];
   this.detail.address1 = this.form.value['address1'];
   this.detail.address2 = this.form.value['address2'];
   this.detail.email= this.form.value['email'];
   this.detail.idNum = this.form.value['idNo'];
   this.detail.location = this.selectedAddress;
   this.detail.city = this.form.value['city'];
   this.detail.date = new Date();


   this.detailDao.addDetails(this.detail).then(() => {


    alert('Successfully Uploaded Details');

    this.router.navigateByUrl('detail');
   })



  }
}

}
