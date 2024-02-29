import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RateMeNowService } from 'src/app/services/rate-me-now.service';
import { RootScopeService } from 'src/app/services/root-scope.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private rateMeNowService: RateMeNowService, private router: Router, private rootScopeService: RootScopeService) { }

  ngOnInit(): void {
    this.rootScopeService.isUserLoggedIn = false;
  }

  signInClicked() {

    this.rateMeNowService.signIn(this.email, this.password).subscribe(response => {
      console.log(response);
      localStorage.setItem("token", response.token);
      this.rootScopeService.isUserLoggedIn = true;
      this.rootScopeService.loggedInUser = response?.userDetails;
      this.router.navigate(['/', 'app-dashboard'])
    },
      error => {
        alert('Invalid credentials');
      }
    )
  }



}
