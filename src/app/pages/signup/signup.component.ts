import { RateMeNowService } from './../../services/rate-me-now.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


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


  constructor(private rateMeNowService: RateMeNowService) {

  }

  ngOnInit(): void {
  }

  signUpClicked() {
    //let SignUppayload = { firstName: this.firstName, lastName: this.lastName, username: this.email, password: this.password }
    this.rateMeNowService.signUp(this.firstName, this.lastName, this.email, this.password).subscribe(response => {
      console.log(response);

    })
  }

}
