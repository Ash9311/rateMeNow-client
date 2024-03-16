import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RateMeNowService } from 'src/app/services/rate-me-now.service';
import { RootScopeService } from 'src/app/services/root-scope.service';

@Component({
  selector: 'my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private rateMeNowService: RateMeNowService, private router: Router, public rootScopeService: RootScopeService) {

  }
  ngOnInit(): void {
    this.rootScopeService.loggedInUser = JSON.parse(localStorage.getItem("rmn-userdetails") || '{}');
    if (!this.rootScopeService.loggedInUser?.userId) {
      this.router.navigate(['/', 'app-signup'])
    }
    else {
      this.rootScopeService.isMyProfile = true;
    }
  }

  backClickedfromRate() {
    this.rootScopeService.isMyProfile = false;
    this.router.navigate(['/', 'app-dashboard']);
  }
}
