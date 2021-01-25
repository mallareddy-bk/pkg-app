import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AuthGaurdService } from './service/auth-guard.service';
import { LoginSuccessComponent } from './login-success/login-success.component';

const routes: Routes = [{ path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent,canActivate:[AuthGaurdService]  },
  { path: 'viewemployee', component: EmployeeComponent,canActivate:[AuthGaurdService] },
  { path: 'addemployee', component: AddEmployeeComponent,canActivate:[AuthGaurdService] },
  { path: 'loginSuccess', component: LoginSuccessComponent,canActivate:[AuthGaurdService] },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
