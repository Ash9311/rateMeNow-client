import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rate-user',
  templateUrl: './rate-user.component.html',
  styleUrls: ['./rate-user.component.css']
})
export class RateUserComponent implements OnInit {

  @Input() userDetails: any;
  @Output() backbuttonClicked = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    

  }

  backClicked() {
    this.backbuttonClicked.emit();
  }

}
