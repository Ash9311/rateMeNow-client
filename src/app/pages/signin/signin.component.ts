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
    if (localStorage.getItem('rmn-userdetails')) {
      this.router.navigate(['/', 'app-dashboard'])
    }
    else{
    localStorage.removeItem('rmn-token');
    localStorage.removeItem('rmn-userdetails');
    this.rootScopeService.isUserLoggedIn = false;
    }
  }

  signInClicked() {
    this.rootScopeService.isLoading = true;
    this.rateMeNowService.signIn(this.email, this.password).subscribe(response => {
      this.rootScopeService.isLoading = false;
      localStorage.setItem("rmn-token", response.token);
      this.rootScopeService.isUserLoggedIn = true;
      this.rootScopeService.loggedInUser = response?.userDetails;
      localStorage.setItem("rmn-userdetails", JSON.stringify(response?.userDetails));
      this.router.navigate(['/', 'app-dashboard'])


    },

      error => {
        alert('Invalid credentials');
        this.rootScopeService.isLoading = false;
      },

    )
  }



}
