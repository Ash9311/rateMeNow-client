import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isprofileButtonClicked: boolean = false;
  constructor() { }
  user: string = "";
  ngOnInit(): void {
  }

  profilButtonClicked() {
    this.isprofileButtonClicked = !this.isprofileButtonClicked;
  }

}
