import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
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
  

  constructor(
    private httpClientService: HttpClientService
  ) { }

  ngOnInit() {
  }

  createEmployee(): void {
    this.httpClientService.createEmployee(this.user)
        .subscribe( data => {
          alert("Employee created successfully.");
        });

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