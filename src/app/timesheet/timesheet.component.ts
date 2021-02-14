import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClientService } from '../service/httpclient.service';

export class State {
  constructor (
    public stateId:string,
    public stateName:string,
  ) {}
}

export class TimesheetData {
  constructor (
    public selectedCountry: String,
    public selectedDate: any,
    public selectedState: any,
    public selectedHotel: any,
    public selectedRoom: any,
    public selectedService: any,
    public empId: any,
  ) {}
}

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})



export class TimesheetComponent implements OnInit {
  selectedCountry='';
  Country: any = ['Australia'];
  states:State[];
  hotels:any[];
  rooms:any[];
  services:any[];
  successMsg=''
  errMsg=''
  timesheetData: TimesheetData = new TimesheetData("","","","","","","");
  maxDate = new Date();

  constructor( private httpClientService: HttpClientService,
    private authService: AuthenticationService,
    private router: Router) { 

  }

  ngOnInit() {
    if (this.authService.isManagerOrSupervisor()) {
      this.authService.logOut();
      this.router.navigate(['login']);
    }
  }

  changeCountry(e) {
    this.errMsg='';
    this.successMsg='';
    this.timesheetData.selectedCountry = e.target.value
    this.selectedCountry=e.target.value
    this.httpClientService.getStates(this.selectedCountry).subscribe(
      data => {
        console.log("State fetch Success!");
        this.states = data;
      },
      error => {
        console.log("State fetch is not Success!");
      }
    );
  }

  changeState(e) {
    this.hotels = this.timesheetData.selectedState.hotels;
    console.log("Select State Success!" + this.timesheetData.selectedState);
  }

  changeHotel(e) {
    this.rooms = this.timesheetData.selectedHotel.rooms;
    console.log("Select Hotel Success!" + this.timesheetData.selectedHotel);
  }

  changeRoom(e) {
    this.services = this.timesheetData.selectedRoom.roomCategories;
    console.log("Select Room Success!" + this.timesheetData.selectedRoom);
  }

  submitTimesheet() {
    this.errMsg='';
    this.successMsg='';
    console.log("Submit timesheet started" + this.timesheetData);
    this.timesheetData.empId = sessionStorage.getItem('username');
    this.httpClientService.submitTimesheet(this.timesheetData).subscribe( data => {
      console.log("Timesheet Success!");
      this.successMsg='Timesheet submitted successfully.';
      this.timesheetData = new TimesheetData("Australia","","","","","","");
      

    },
    error => {
      console.log("Timesheet Failed!");
      this.errMsg='Please enter all the mandatory fields';
    }
  );
  };
  

}
