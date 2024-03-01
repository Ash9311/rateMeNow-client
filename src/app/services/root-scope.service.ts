import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RootScopeService {
  isUserLoggedIn: boolean = false;
  loggedInUser: any;
  isMyProfile: boolean = false;
  isLoading: boolean = false;
  constructor() { }
}
