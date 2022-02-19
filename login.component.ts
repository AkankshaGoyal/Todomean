import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy{
  isLoading = false;
  private authListenerSubs : Subscription;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated =>{
          this.isLoading = isAuthenticated;
    });
  }
  onLogin(form:NgForm){
      console.log(form.value);
      if(form.invalid){
        return;
    }
    this.isLoading = true;
    const auth: AuthData={
      email:form.value.email,
      password:form.value.password
    }
    this.authService.login(auth);
  }
ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
}
}
