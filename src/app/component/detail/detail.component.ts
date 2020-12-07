import { DetailsService } from './../../services/details.service';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Detail } from 'src/model/detail';







export interface PeriodicElement {
  name: string;
  surname:string;
  IDNo:number;
  city: string;


}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'test', surname: 'mngadi', IDNo: 9404206547080, city: 'Cape Town' }

];


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})




export class DetailComponent implements OnInit {



detailsList: any[] = [];

public pageSize = 10;
public currentPage = 0;
public totalSize = 0;
public pageOption =0;

  displayedColumns: string[] = [ 'name', 'surname', 'IDNo',  'city', 'date'];
  dataSource = ELEMENT_DATA;

  constructor(private router: Router, private loginDao: LoginService, private detailDao: DetailsService) {


    this.dataSource = this.detailsList;


  }

  ngOnInit(){

    this. getDetails();


  }

  goToForm(){

    this.router.navigateByUrl("form");
  }

  signOut(){


  this.loginDao.logout().then(() => {

    this.router.navigateByUrl("login");
  })
  }


  getDetails(){

    this.detailDao.getDetails().subscribe(data => {

    this.detailsList =  data.map(e=> {



      return{

        key: e.payload.doc.id,
        ...e.payload.doc.data() as Detail
      } as Detail


      });





    })

    console.log(this.detailsList);
  }




  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.pageOption =e.pageSizeOptions;

    this.detailDao.getDetailsPagnitator(this.pageSize).subscribe(data => {

      this.detailsList =  data.map(e=> {



        return{

          key: e.payload.doc.id,
          ...e.payload.doc.data() as Detail
        } as Detail


        });


    })


  }



}
