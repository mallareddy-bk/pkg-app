import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClientService } from '../service/httpclient.service';

export interface PeriodicElement {
  position: number;
  timesheetId: number;
  empId: string;
  hotelName: string;
  roomNo: string;
  serviceName: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  
  displayedColumns: string[] = ['position', 'empId', 'hotelName', 'roomNo', 'serviceName', 'date','action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor(private router: Router,
    private httpClientService: HttpClientService,
    private authService: AuthenticationService,
    private changeDetectorRefs: ChangeDetectorRef) { }
  
  ngOnInit() {
    if (!this.authService.isManagerOrSupervisor()) {
      this.authService.logOut();
      this.router.navigate(['login']);
    }
    this.getPendingApprovalTaskList();
  }

  getPendingApprovalTaskList() {
    this.httpClientService.getPendingTaskList().subscribe(
      data => {
        console.log("State fetch Success!");
        this.dataSource.data = data as PeriodicElement[];
      },
      error => {
        console.log("State fetch is not Success!");
      }
    );
  }

  redirectToView(element: PeriodicElement) {
    this.router.navigate(['/viewtask', element.position])
  }

  approve(element: PeriodicElement) {
    this.httpClientService.approve(element).subscribe(
      data => {
        console.log("State fetch Success!");
        this.dataSource.data = data as PeriodicElement[];
      },
      error => {
        console.log("State fetch is not Success!");
      }
    );
    
  }

  reject(element: PeriodicElement) {
    this.httpClientService.reject(element).subscribe(
      data => {
        console.log("State fetch Success!");
        this.dataSource.data = data as PeriodicElement[];
      },
      error => {
        console.log("State fetch is not Success!");
      }
    );
  }

}
