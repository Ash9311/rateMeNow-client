import { Component } from '@angular/core';
import { RootScopeService } from '../app/services/root-scope.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rateMeNow-client';

  constructor(public rootScopeService: RootScopeService) {

  }
}
