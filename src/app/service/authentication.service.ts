import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, HttpClientService } from './httpclient.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClientService:HttpClientService
  ) { }

  

  authenticate(username, password) {
    let employee = this.httpClientService.login(username, password).subscribe();
    if (null != employee) {
      sessionStorage.setItem('username', username)
      return true;
    } else {
      return false;
    }
    
  };

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  isManagerOrSupervisor() {
    let designation = sessionStorage.getItem('designation')
    return (designation === 'Manager' || designation === 'Supervisor')
  }

  isHouseman() {
    let designation = sessionStorage.getItem('designation')
    return (designation === 'Houseman')
  }

  logOut() {
    sessionStorage.removeItem('username')
  }

  getHeaders(username, password){
     
    let  basicString='Basic '+window.btoa(username + ':' + password)
    return basicString;
  }
}
