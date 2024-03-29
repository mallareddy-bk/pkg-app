import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EmployeeComponent } from '../employee/employee.component';
import { Observable } from 'rxjs';
import { State, TimesheetData } from '../timesheet/timesheet.component';

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

    public login(empId, password):Observable<any> {
      let employee: Employee = new Employee(empId, "", "", "", "", "", "", "", password);
      return this.httpClient.post<any>("http://localhost:8080/employees/login/", employee);
  }

  public getStates(countryName):Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/state/states', countryName);
  }

  public submitTimesheet(timesheetData) {
    return this.httpClient.post<TimesheetData>('http://localhost:8080/timesheet/submit', timesheetData);
  }

  public getPendingTaskList() {
    return this.httpClient.get<any[]>('http://localhost:8080/timesheet/tasklist');
  }

  public approve(periodicElement) {
    return this.httpClient.post<any[]>('http://localhost:8080/timesheet/approve', periodicElement);
  }

  public reject(periodicElement) {
    return this.httpClient.post<any[]>('http://localhost:8080/timesheet/reject', periodicElement);
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