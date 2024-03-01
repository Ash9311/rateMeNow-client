import { RootScopeService } from './../../services/root-scope.service';
import { RateMeNowService } from './../../services/rate-me-now.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";


  constructor(private rateMeNowService: RateMeNowService, private router: Router, private rootScopeService: RootScopeService) {

  }

  ngOnInit(): void {
    this.rootScopeService.isUserLoggedIn = false;
  }

  signUpClicked() {
    this.rootScopeService.isLoading = true;
    this.rateMeNowService.signUp(this.firstName, this.lastName, this.email, this.password).subscribe(response => {
      this.rootScopeService.isLoading = false;
      localStorage.setItem("token", response.token);

      this.rootScopeService.loggedInUser = response?.userDetails;
      this.router.navigate(['/', 'app-dashboard'])
    })
  }

}
