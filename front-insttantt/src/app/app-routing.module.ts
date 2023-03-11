import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./auth-guard.guard"
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HobbieComponent } from './components/hobbie/hobbie.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  }, 
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
          {
            path: "profile",
            canActivate: [AuthGuard],
            component: ProfileComponent
          }, 
          {
            path: "hobbie",
            canActivate: [AuthGuard],
            component: HobbieComponent
          },
          {
            path: "home",
            canActivate: [AuthGuard],
            component: HomeComponent
          }, 
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }