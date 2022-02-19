import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";
import { AuthData } from "./auth-data.model";
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
const API_BASE_URL = environment.api_url+"users/";
@Injectable ({providedIn:"root"})
export class AuthService{
    private token: string;
    private authStatusListener = new Subject<boolean>();
    private authStatus = false;
    tokenTimer:any = null;
    private userId: string = null;
    constructor(private http: HttpClient,private router:Router){
    }
    getAuthStatus(){
        return this.authStatus;
    }
    getAuthStatusListener()
    {
        return this.authStatusListener.asObservable();
    }
    getToken(){
        return this.token;
    }
    getUserId()
    {
        return localStorage.getItem('userId');
    }
    createUser(authData : AuthData){
        console.log(authData)
      this.http.post(API_BASE_URL+"signup",authData)
      .subscribe(resp =>{
         console.log(resp);
         this.router.navigate(['/']);
      })
    }
    autoAuthUser(){
        const authInfo = this.getAuthData();
        if(authInfo){
            const expiresIn  = authInfo.expirationDate.getTime()-(new Date()).getTime();
            console.log(authInfo,expiresIn);
            if(expiresIn > 0)
            {
               this.token = authInfo.token;
               this.authStatus = true;

               this.tokenTimer = setTimeout(()=>{
               this.logout();
                },expiresIn);
               this.authStatusListener.next(true);
            }
        }
    }
    login(authData : AuthData){
        this.http.post<{status:{},data:{token:string,expiresIn:number,userId: string}}>(
            API_BASE_URL+"login",authData)
        .subscribe((resp) =>{
            console.log(resp);
            this.token = resp.data.token;
            if(this.token){
               const expiresIn = resp.data.expiresIn;

               this.tokenTimer = setTimeout(()=>{
                         this.logout();
                        }, expiresIn*1000);
             const now = new Date();
             const expirationDate = new Date(now.getTime()+expiresIn*1000);
             this.userId = resp.data.userId;
             this.saveAuthData(this.token,expirationDate,this.userId);
             this.authStatusListener.next(true);
             this.authStatus = true;
             this.router.navigate(['/']);
            }
         }, err => {
            console.log(err);
            this.authStatusListener.next(false);
        });
    }
     logout()
     {
         this.token = null;
         this.userId = null;
         this.authStatus = false;
         this.authStatusListener.next(false);
         clearTimeout(this.tokenTimer);
         this.clearAuthData();
         this.router.navigate(['/']); 
     }
     private saveAuthData(token:string,expirationDate:Date,userId: string)
     {
         localStorage.setItem("token", token);
         localStorage.setItem("expiration",expirationDate.toISOString());
         localStorage.setItem("userId",userId);
    }
     private clearAuthData()
     {
         localStorage.removeItem("token");
         localStorage.removeItem("expiration");
         localStorage.removeItem("userId");
     }
     private getAuthData(){
         const token = localStorage.getItem("token");
         const expirationDate = localStorage.getItem("expiration");
         const userId = localStorage.getItem("userId");
         if(token){
          return {
             token: token,
             expirationDate: new Date(expirationDate),
             userId : userId
         }
        }
        else{
            return null;
        }
     }
} 
