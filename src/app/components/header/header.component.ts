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
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.documentClickHandler);
  }

  profilButtonClicked() {
    this.isprofileButtonClicked = !this.isprofileButtonClicked;
  }

  private handleDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isprofileButtonClicked = false;
    }
  }

}
