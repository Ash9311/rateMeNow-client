import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { RateUserComponent } from './pages/rate-user/rate-user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'app-signup', component: SignupComponent },
  { path: 'app-signin', component: SigninComponent },
  { path: 'app-rate-user', component: RateUserComponent },
  { path: 'app-dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/app-signup', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
