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
  userDetails: any;
  constructor(private rateMeNowService: RateMeNowService, private router: Router, private rootScopeService: RootScopeService) { }

  ngOnInit(): void {
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
  }

  getAllUsers() {
    const authToken = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`)
    this.rateMeNowService.getBulkUsers(headers, this.filter.toLowerCase()).subscribe(response => {
      this.users = response?.users;
    });
  }

}
