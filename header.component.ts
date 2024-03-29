import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy{
  private authListenerSubs: Subscription; 
  public userIsAuthenticated = false; 
  constructor(private authService:AuthService){}
    ngOnInit(){
       this.userIsAuthenticated= this.authService.getAuthStatus();
       this.authListenerSubs = this.authService
       .getAuthStatusListener()
       .subscribe(isAuthenticated =>{
            this.userIsAuthenticated = isAuthenticated;
            this.userIsAuthenticated = isAuthenticated;
          }); 
    }
    onLogout()
    {
            this.authService.logout();
    }
    ngOnDestroy(){
        this.authListenerSubs.unsubscribe()
    }
}
