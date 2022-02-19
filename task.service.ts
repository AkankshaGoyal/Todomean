import {Injectable} from '@angular/core';
import { Task } from './task.model';
import { Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment'
const API_BASE_URL = environment.api_url+"tasks/";

 @Injectable({providedIn: 'root'})
 export class TasksService{
     private tasks: Task[]=[];
     private tasksUpdated = new Subject<{tasks:Task[],totalCount:number}>();
     constructor(private http: HttpClient,private router:Router){
     }  
getTasks(taskPerPage?:number,currentPage?:number){
    let url = API_BASE_URL;
    if(taskPerPage && (currentPage > -1)){
        console.log("in getTasks ",taskPerPage && currentPage);
        url += `?pagesize=${taskPerPage}&currentpage=${currentPage}`;
    }
    this.http.get<{status:{},data:Task[],totalCount:number}>(url)
    .subscribe((taskData)=>{
        this.tasks = taskData.data;
        this.tasksUpdated.next({tasks:[...this.tasks],totalCount:taskData.totalCount});
       });
}
getTask(id:String){
       return this.http.get<{status:{},data:Task}>(API_BASE_URL+id);
   }
updateTask(task:Task){
    let taskData = null;
    if(typeof(task.imagePath)=='string')
    {
           taskData = task;
    }
    else
    {   taskData = new FormData();
        taskData.append("_id",task._id);
        taskData.append("title",task.title);
        taskData.append("description",task.description);
        taskData.append('image',task.imagePath);
    }
    this.http.put<{status:{},data:Task[]}>(API_BASE_URL+task._id,taskData)
    .subscribe((resp)=>{
        console.log(resp);
        this.router.navigate(['/']);
    })
}
getTaskUpdateLister(){
       return this.tasksUpdated.asObservable();
   }
addTask(task: Task,image:File)
   {
    const taskData = new FormData();
    taskData.append("title",task.title);
    taskData.append("description",task.description);
   //added the title with image 
    taskData.append('image',image);
    this.http.post<{status:{},data:Task[]}>(API_BASE_URL,taskData)
     .subscribe((resp)=>{
       console.log(resp);
       this.router.navigate(['/']);
   })
 }
deleteTask(id : String){
    console.log("in deleted service file")
 return  this.http.delete(API_BASE_URL+id)

 }
}