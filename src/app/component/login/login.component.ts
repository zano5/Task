import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/model/login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = {} as Login;
  form: FormGroup;
  submitted = false
  error = ''

  constructor(private router: Router, private loginDao: LoginService, fb: FormBuilder) {


    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

  }

  ngOnInit(): void {
  }




  valid(field) {
    if (!this.submitted) {
      return true
    }

   // return this.form.get(field).valid
  }

  submit() {
    this.submitted = true
    this.error = '';

    if (this.form.valid) {
      console.log(this.form.value)
      this.loginDao.emailPassword(this.form.value['email'], this.form.value['password']).then(() => {
        console.log('Success');
        this.router.navigateByUrl('detail');

      }).catch(err => {
        console.log(err)
        this.error = err.message
      });
    }
  }




}
