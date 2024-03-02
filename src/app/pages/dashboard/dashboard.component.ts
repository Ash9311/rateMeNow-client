import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RateMeNowService } from 'src/app/services/rate-me-now.service';
import { RootScopeService } from 'src/app/services/root-scope.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any;
  filter = "";
  isRateclicked: boolean = false;
  accountDetails: any = [];
  userDetails: any;
  constructor(private rateMeNowService: RateMeNowService, private router: Router, public rootScopeService: RootScopeService) { }

  ngOnInit(): void {
    this.rootScopeService.loggedInUser = JSON.parse(localStorage.getItem("userdetails") || '{}');
    this.rootScopeService.isUserLoggedIn = true;
    this.getAllUsers();

  }

  search() {

  }

  rateClicked(event: MouseEvent, userdata: any) {
    this.isRateclicked = true;
    this.userDetails = userdata;
  }

  backClickedfromRate() {
    this.isRateclicked = false;
    this.rootScopeService.isMyProfile = false;
  }

  getAllUsers() {
    const authToken = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`)
    this.rateMeNowService.getBulkUsers(headers, this.filter.toLowerCase()).subscribe(response => {
      this.users = response?.users;
      this.getAllAccountDetails();
    });
  }

  getAllAccountDetails() {
    const authToken = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`)
    this.rateMeNowService.getUserRatingDetails("", headers).subscribe(response => {

      this.accountDetails = response.account.map((account: any) => ({
        _id: account.userId,
        OverallRating: (account.rating.reduce((sum: any, rating: any) => sum + rating.OverallRating, 0) / account.rating.length).toFixed(2),
        ratedUsers: account.rating.length
      }));


      this.users = this.users?.map((user: any) => {
        const account = this.accountDetails.find((accountDetail: any) => accountDetail._id === user._id);
        if (account) {
          return {
            ...user,
            overallRating: account.OverallRating,
            ratedUsers: account.ratedUsers
          };
        } else {
          return user;
        }
      });

    });


  }

}
