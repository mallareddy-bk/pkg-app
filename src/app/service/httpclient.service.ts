import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EmployeeComponent } from '../employee/employee.component';
import { Observable } from 'rxjs';

export class Employee{
  constructor(
    public empId:string,
    public name:string,
    public designation:string,
    public emailId:string,
    public address:string,
    public identityNo:string,
    public gender:string,
    public phoneNumber:string,
    public password:string,
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient:HttpClient
  ) { 
     }

     

     getEmployees()
  {
    let basicString=this.getHeaders();

    let headers=new HttpHeaders(
      {Authorization:basicString}
    );
    console.log("test call");
    return this.httpClient.get<Employee[]>('http://localhost:8080/employees');
  }

  public deleteEmployee(employee) {
    return this.httpClient.delete<Employee>("http://localhost:8080/employees" + "/"+ employee.empId);
  }

  public createEmployee(employee) {
    return this.httpClient.post<Employee>("http://localhost:8080/employees", employee);
  }

    public login(username, password):Observable<any> {
      let employee: Employee = new Employee(username, "", "", "", "", "", "", "", password);
      return this.httpClient.post<any>("http://localhost:8080/employees/login/", employee);
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

getHeaders(){
  let username='admin'
  let password='password'

  let  basicString='Basic '+window.btoa(username + ':' + password)
  return basicString;
}

}