import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RateMeNowService } from 'src/app/services/rate-me-now.service';
import { RootScopeService } from 'src/app/services/root-scope.service';
import * as _ from 'lodash';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-rate-user',
  templateUrl: './rate-user.component.html',
  styleUrls: ['./rate-user.component.css']
})
export class RateUserComponent implements OnInit {

  @Output() ratingChanged = new EventEmitter<number>();

  currentRating: any = {
    "Kindness": 0,
    "TrustWorthy": 0,
    "ProblemSolvingSkills": 0,
    "Professionalism": 0,
    "Adaptability": 0,
    "Teamwork": 0,
    "CommunicationSkills": 0,
    "SenseOfHumor": 0
  };

  currentRatingPtg: any = {
    "Kindness": 0,
    "TrustWorthy": 0,
    "ProblemSolvingSkills": 0,
    "Professionalism": 0,
    "Adaptability": 0,
    "Teamwork": 0,
    "CommunicationSkills": 0,
    "SenseOfHumor": 0
  };

  ratings: any;
  userRatingDetails: any;
  OverallRating: number = 0;
  avgOverallRating: number = 0;
  avgOverallRatingstar: number = 0;

  totalRaters: number = 0;
  @Input() userDetails: any;
  @Output() backbuttonClicked = new EventEmitter<any>();

  ratingCriteria: any = ["Kindness",
    "trust worthy",
    "Problem solvings skills",
    "Professionalism",
    "Adaptability",
    "Teamwork",
    "Communication skills",
    "Sense of humor"];

  criteriaAvg: any = {
    "Kindness": 0,
    "TrustWorthy": 0,
    "ProblemSolvingSkills": 0,
    "Professionalism": 0,
    "Adaptability": 0,
    "Teamwork": 0,
    "CommunicationSkills": 0,
    "SenseOfHumor": 0
  };

  constructor(private rateMeNowService: RateMeNowService, private router: Router, public rootScopeService: RootScopeService) { }

  ngOnInit(): void {

    if (this.rootScopeService.isMyProfile) {
      let loggedInUserDetail = _.cloneDeep(this.rootScopeService.loggedInUser);
      loggedInUserDetail["_id"] = loggedInUserDetail["userId"];
      delete loggedInUserDetail["userId"];
      this.userDetails = loggedInUserDetail;
    }
    this.fetchUserRatingDetails();

  }

  fetchUserRatingDetails() {
    const authToken = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`)
    this.rootScopeService.isLoading = true;
    this.rateMeNowService.getUserRatingDetails(this.userDetails._id, headers).subscribe(response => {
      this.userRatingDetails = response?.account[0]?.rating;
      this.getAvgCriteria();
      this.computeCriteriaMetrics();
      this.rootScopeService.isLoading = false;

    },
      error => {
        this.rootScopeService.isLoading = false;
      })
  }

  computeOverallRating() {
    let count = 0;
    let sum = 0;

    for (const key in this.currentRating) {
      if (this.currentRating[key] > 0) {
        count++;
        sum += this.currentRating[key];
      }
    }
    this.OverallRating = sum / count;

  }

  computeCriteriaMetrics() {
    let overallRatingsList = _.cloneDeep(this.userRatingDetails);
    let criteriaAvg: any = {
      "Kindness": 0,
      "TrustWorthy": 0,
      "ProblemSolvingSkills": 0,
      "Professionalism": 0,
      "Adaptability": 0,
      "Teamwork": 0,
      "CommunicationSkills": 0,
      "SenseOfHumor": 0
    };
    for (let x of overallRatingsList) {
      criteriaAvg.Kindness += x.Kindness;
      criteriaAvg.TrustWorthy += x.TrustWorthy;
      criteriaAvg.ProblemSolvingSkills += x.ProblemSolvingSkills;
      criteriaAvg.Professionalism += x.Professionalism;
      criteriaAvg.Adaptability += x.Adaptability;
      criteriaAvg.Teamwork += x.Teamwork;
      criteriaAvg.CommunicationSkills += x.CommunicationSkills;
      criteriaAvg.SenseOfHumor += x.SenseOfHumor;

    }
    _.forEach(criteriaAvg, (value, key) =>
      this.currentRatingPtg[key] = ((value / this.totalRaters) * 20).toFixed(0)
    )
    // this.criteriaAvg = _.map(this.criteriaAvg, (value, key) => {  problem here is map will split out each indexes
    //   return {
    //     [key]: value / this.totalRaters
    //   };
    // });


  }

  getAvgCriteria() {
    let overallRatingsList = _.cloneDeep(this.userRatingDetails);
    let sumOverallRatings = 0;
    _.forEach(overallRatingsList, x =>
      sumOverallRatings += x.OverallRating
    )
    this.totalRaters = overallRatingsList.length;
    this.avgOverallRating = sumOverallRatings / this.totalRaters;
    this.avgOverallRatingstar = Math.round(this.avgOverallRating)
    this.avgOverallRating = +this.avgOverallRating.toFixed(2);
  }

  getCurrentRatingKeys() {
    return Object.keys(this.currentRating);
  }

  getRating(criterion: string) {
    return this.currentRating[criterion]
  }

  setRating(criterion: string, rating: number) {
    this.currentRating[criterion] = rating;
    this.ratingChanged.emit(rating);
  }

  backClicked() {
    this.backbuttonClicked.emit();
  }

  submitRating() {

    this.computeOverallRating();
    let payload = {
      ...this.currentRating,
      OverallRating: this.OverallRating,
      RatedBy: this.rootScopeService.loggedInUser.userId
    };
    const authToken = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    this.rootScopeService.isLoading = true;
    this.rateMeNowService.submitRating(this.userDetails.
      _id, payload, headers).subscribe(response => {
        this.rootScopeService.isLoading = false;
        alert("rating submitted successfully")
        this.fetchUserRatingDetails();

      },
        error => {
          this.rootScopeService.isLoading = false;
        });

  }
  ngOnDestroy() {
    this.rootScopeService.isMyProfile = false;
  }



}
