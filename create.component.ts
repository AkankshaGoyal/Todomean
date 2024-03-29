import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Task } from '../task.model';
import { TasksService } from '../task.service';
import {imageTypeValidator} from './image-type.validator';
@Component({
     selector: 'app-task-create',
     templateUrl:'./create.component.html',
     styleUrls:['./create.component.scss'],
     
 })
export class CreateTaskComponent {
mode = 'create';
private taskId:string = null;

task :Task;
taskForm:FormGroup;
isLoading = false;
imagePreview:any= null;
constructor(public tasksService:TasksService,public route:ActivatedRoute){}
ngOnInit(){
    this.route.paramMap.subscribe((paramMap :ParamMap)=>{
        if(paramMap.has("taskId")){
            this.taskForm = new FormGroup({
                'title': new FormControl(null,{validators:[Validators.required,Validators.minLength(5)]}),
                'description': new FormControl(null,{validators:[Validators.required]}),
                'image':new FormControl(null,{validators:[Validators.required]})
           });
            this.mode ='edit';
            this.taskId = paramMap.get('taskId');
            this.isLoading = true;
            this.tasksService.getTask(this.taskId)
            .subscribe((resp)=>{
                this.isLoading = false;
                this.task= resp.data;
                this.taskForm.setValue({
                'title':this.task.title,
                'description':this.task.description,
                'image':this.task.imagePath
            })
            })
        }
        else{
            this.taskForm = new FormGroup({
                'title': new FormControl(null,{validators:[Validators.required,Validators.minLength(5)]}),
                'description': new FormControl(null,{validators:[Validators.required]}),
                'image':new FormControl(null,{validators:[Validators.required,imageTypeValidator]})
           });
            this.mode ='create'
            this.taskId = null;
        }
        })
}
onImagePicked(event:Event)
{   console.log("type of image var",typeof(this.taskForm.value.image));
    const file = (event.target as HTMLInputElement).files[0];
    console.log("type of image var",file);
    this.taskForm.patchValue({image:file});
    this.taskForm.get('image').updateValueAndValidity();
    
    this.imageToDataUrl(file);

}
imageToDataUrl(file:File)
{
    const reader = new FileReader();
    reader.onload = () =>{
        this.imagePreview = reader.result;
    }

    reader.readAsDataURL(file);
}
onSaveTask(){
    console.log(this.taskForm.value)
    console.log(this.taskForm.valid)
   if(!this.taskForm.valid){
      return;
    }
   const task: Task ={
       _id:null,
       title: this.taskForm.value.title,
       description : this.taskForm.value.description,
       imagePath:this.taskForm.value.image,
       creator : ""
    };
    if(this.mode =='edit'){
       task._id = this.task._id;
       task.creator = this.task.creator;
       this.tasksService.updateTask(task);
    }
    else{
        this.tasksService.addTask(task,this.taskForm.value.image);
    }
    this.taskForm.reset(); 
 }
}