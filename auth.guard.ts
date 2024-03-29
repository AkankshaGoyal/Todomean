import { Injectable} from "@angular/core";
import { CanActivate } from "@angular/router";
import { ActivatedRouteSnapshot,Router,RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
@Injectable()
export class AuthGuard implements CanActivate{

constructor(private authService: AuthService,private router:Router)
{}

  canActivate(
     route : ActivatedRouteSnapshot,
     state : RouterStateSnapshot
   ):boolean| Observable<boolean> | Promise<boolean>{
    const isAuth = this.authService.getAuthStatus();
    if(!isAuth){
         this.router.navigate(['/login']);
      }
     return isAuth;
   }
}
