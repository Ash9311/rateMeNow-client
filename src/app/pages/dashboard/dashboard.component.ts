import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  constructor(private rateMeNowService: RateMeNowService, private router: Router, private rootScopeService: RootScopeService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    const authToken = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`)
    this.rateMeNowService.getBulkUsers(headers).subscribe(response => {
      this.users = response?.users;
    });
  }

}
