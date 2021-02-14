import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClientService, Employee } from '../service/httpclient.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  user: Employee = new Employee("","","","","","","","", "");

  Designation: any = ['Manager', 'Supervisor', 'Houseman'];

  Gender: any = ['Male', 'Female'];
  
  successMsg=''

  errMsg=''

  constructor(
    private httpClientService: HttpClientService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.authService.isManagerOrSupervisor()) {
      this.authService.logOut();
      this.router.navigate(['login']);
    }
  }

  createEmployee(): void {
    this.errMsg='';
    this.successMsg='';
    this.httpClientService.createEmployee(this.user)
        .subscribe( data => {
          console.log("Registration Success!");
          this.successMsg='New employee added successfully.';
        },
        error => {
           this.errMsg='Please enter all the mandatory fields';
        }
      );

  };

  changeDesignation(e) {
    console.log(e.value)
    this.user.designation = e.target.value
  }

  changeGender(e) {
    console.log(e.value)
    this.user.gender = e.target.value
  }
}