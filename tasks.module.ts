import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AngularMaterialModule} from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTaskComponent } from "./create/create.component";
import { ListComponent } from "./list/list.component";

@NgModule({
    declarations:[
        CreateTaskComponent,
        ListComponent,
    ],
    imports:[
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
    ]
})
export class TasksModule{}