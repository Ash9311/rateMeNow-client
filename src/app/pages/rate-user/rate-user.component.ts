import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RateMeNowService } from 'src/app/services/rate-me-now.service';
import { RootScopeService } from 'src/app/services/root-scope.service';
@Component({
  selector: 'app-rate-user',
  templateUrl: './rate-user.component.html',
  styleUrls: ['./rate-user.component.css']
})
export class RateUserComponent implements OnInit {

  @Output() ratingChanged = new EventEmitter<number>();

  currentRating: any = {
    "Kindness": 0,
    "trustWorthy": 0,
    "ProblemSolvingSkills": 0,
    "Professionalism": 0,
    "Adaptability": 0,
    "Teamwork": 0,
    "CommunicationSkills": 0,
    "SenseOfHumor": 0
  };
  ratings: any;
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
    this.rateMeNowService.submitRating(this.userDetails.
      _id, this.currentRating).subscribe(response => {
        console.log(response);

      });
  }


}
