import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RateMeNowService } from 'src/app/services/rate-me-now.service';
import { RootScopeService } from 'src/app/services/root-scope.service';
import * as _ from 'lodash';
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
  ratings: any;
  userRatingDetails: any;
  OverallRating: number = 0;
  avgOverallRating: number = 0;
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

  constructor(private rateMeNowService: RateMeNowService, private router: Router, private rootScopeService: RootScopeService) { }

  ngOnInit(): void {
    this.fetchUserRatingDetails();
  }

  fetchUserRatingDetails() {
    this.rateMeNowService.getUserRatingDetails(this.userDetails._id).subscribe(response => {
      this.userRatingDetails = response?.account?.rating;
      this.getAvgCriteria();
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

  getAvgCriteria() {
    let overallRatingsList = _.cloneDeep(this.userRatingDetails);
    let sumOverallRatings = 0;
    _.forEach(overallRatingsList, x =>
      sumOverallRatings += x.OverallRating
    )
    this.totalRaters = overallRatingsList.length;
    this.avgOverallRating = sumOverallRatings / this.totalRaters;
    console.log(this.avgOverallRating);

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
    this.rateMeNowService.submitRating(this.userDetails.
      _id, payload).subscribe(response => {
        alert("rating submitted successfully")
        this.fetchUserRatingDetails();

      });

  }


}
