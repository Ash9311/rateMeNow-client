import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RateUserComponent } from './pages/rate-user/rate-user.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MyProfileComponent } from "./pages/my-profile/my-profile.component";

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        SigninComponent,
        DashboardComponent,
        RateUserComponent,
        HeaderComponent,
        MyProfileComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule

    ]
})
export class AppModule { }
