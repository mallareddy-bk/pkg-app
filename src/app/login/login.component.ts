import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClientService } from '../service/httpclient.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false
  msg = ''
  

  constructor(private router: Router,
    private loginservice: AuthenticationService,
    private httpClientService:HttpClientService) { }

  ngOnInit() {
  }

  checkLogin() {
    this.httpClientService.login(this.username, this.password).subscribe(
      data => {
        console.log("Login Success!");
        this.router.navigate(['/viewemployee'])
        this.invalidLogin = false
        sessionStorage.setItem('username', this.username)
      },
      error => {
        this.invalidLogin = true
        this.msg='Invalid Employee ID or Password.';
      }
    );
  
  }

}
