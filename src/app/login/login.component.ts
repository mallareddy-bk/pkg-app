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

  empId = ''
  password = ''
  invalidLogin = false
  msg = ''
  

  constructor(private router: Router,
    private loginservice: AuthenticationService,
    private httpClientService:HttpClientService) { }

  ngOnInit() {
  }

  checkLogin() {
    this.httpClientService.login(this.empId, this.password).subscribe(
      data => {
        console.log("Login Success!");
        this.router.navigate(['/loginSuccess'])
        this.invalidLogin = false
        sessionStorage.setItem('username', this.empId)
        sessionStorage.setItem('designation', data.designation)
      },
      error => {
        this.invalidLogin = true
        if (error.statusText == 'OK') {
          this.msg='Invalid Employee ID or Password.';
        } else {
          this.msg='System error, please try again later';
        }
        
        
      }
    );
  
  }

}
