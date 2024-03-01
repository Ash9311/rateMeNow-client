import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RateMeNowService } from 'src/app/services/rate-me-now.service';
import { RootScopeService } from 'src/app/services/root-scope.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isprofileButtonClicked: boolean = false;
  documentClickHandler: any;

  constructor(private rateMeNowService: RateMeNowService, private router: Router, public rootScopeService: RootScopeService, private elementRef: ElementRef) {
    this.documentClickHandler = this.handleDocumentClick.bind(this);
  }

  user: string = "";
  ngOnInit(): void {
    this.documentClickHandler = this.handleDocumentClick.bind(this);
    document.addEventListener('click', this.documentClickHandler);
    // this.user = this.rootScopeService.loggedInUser.userDetails.firstName;
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.documentClickHandler);
  }

  profileButtonClicked() {
    this.isprofileButtonClicked = !this.isprofileButtonClicked;
  }

  myProfile() {
    this.rootScopeService.isMyProfile = true;
    //this.router.navigate(['/my-profile']);
    this.router.navigate(['/', 'my-profile'])
  }

  private handleDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isprofileButtonClicked = false;
    }
  }

}
