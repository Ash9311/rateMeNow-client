import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RootScopeService {
  isUserLoggedIn: boolean = false;
  constructor() { }
}
