import { Component, OnInit, OnDestroy} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {Task} from '../task.model';
import { TasksService } from '../task.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy{
storedTasks: Task[] =[];
isLoading = false;
totalTasks = 0;
pageIndex = 0;
pageSize = 0 ;
pageSizeOptions = [1,5,10,100];
userId:any = null;
private tasksSub :Subscription;
private authListenerSubs: Subscription; 
public userIsAuthenticated = false;  
    constructor(public tasksService:TasksService, private authService:AuthService){
    }
   ngOnInit(){
      this.tasksService.getTasks(this.pageSize, this.pageIndex);
      this.isLoading = true;
      this.tasksSub = this.tasksService.getTaskUpdateLister()
     .subscribe((taskData: any) => {
       this.isLoading = false;
       console.log(taskData);
       this.storedTasks = taskData.tasks;
       this.totalTasks = taskData.totalCount;
      });
      this.userIsAuthenticated = this.authService.getAuthStatus();
      this.userId = this.authService.getUserId();
      this.authListenerSubs = this.authService
       .getAuthStatusListener()
       .subscribe(isAuthenticated =>{
            this.userIsAuthenticated = isAuthenticated;
            this.userId = this.authService.getUserId();
       }); 
    }
    onChangePage(event : PageEvent){
       console.log(event);
       this.pageSize = event.pageSize;
       this.pageIndex = event.pageIndex;
       console.log("checking pageIndex",this.pageIndex);
       this.tasksService.getTasks(this.pageSize,this.pageIndex);
    }
    onDelete(id:String){
      this.tasksService.deleteTask(id).subscribe(r=>{
        this.tasksService.getTasks(this.pageSize, this.pageIndex);
      });
    }
    ngOnDestroy()
        {
           this.tasksSub.unsubscribe();
           this.authListenerSubs.unsubscribe();
    }
 }
