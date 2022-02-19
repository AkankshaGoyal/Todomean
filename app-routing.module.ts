import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CreateTaskComponent } from './tasks/create/create.component';
import { ListComponent } from './tasks/list/list.component';

const routes: Routes = [
  {path:'',component :ListComponent},
  {path:'create',component :CreateTaskComponent, canActivate:[AuthGuard]},
  {path:'edit/:taskId',component :CreateTaskComponent,canActivate:[AuthGuard]},
  {path:'auth', loadChildren : () =>import ('src/app/auth/auth.module').then(m => m.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
