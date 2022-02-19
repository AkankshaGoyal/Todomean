import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { AuthData } from '../auth-data.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
  isLoading = false;
  private authListenerSubs : Subscription;
  constructor(public authService :AuthService) { }

  ngOnInit(): void {
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isLoading = isAuthenticated;
    });
  }
  onSignUp(form:NgForm){
    console.log(form)
    if(form.invalid){
        return;
    }
    this.isLoading = true;
    const auth: AuthData={
      email:form.value.email,
      password : form.value.password
    }
    console.log(auth)
    this.authService.createUser(auth);
}
ngOnDestroy(){
  this.authListenerSubs.unsubscribe();
}
}
