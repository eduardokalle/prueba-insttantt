import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./auth-guard.guard"
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  }, 
  {
    path: "register",
    component: RegisterComponent
  }, 
  {
    path: "profile",
    component: ProfileComponent
  }, 
  {
    path: "home",
    component: HomeComponent
  }, 
  {
    path: "dashboard",
    component: DashboardComponent
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }