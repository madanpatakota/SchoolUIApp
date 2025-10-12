import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { ListTeachersComponent } from './pages/list-teachers/list-teachers.component';
import { CreateTeacherComponent } from './pages/create-teacher/create-teacher.component';
import { EditTeacherComponent } from './pages/edit-teacher/edit-teacher.component';
import { TeachersService } from './services/teachers.service';

@NgModule({
  declarations: [
    TeachersComponent,
    ListTeachersComponent,
    CreateTeacherComponent,
    EditTeacherComponent
  ],
  imports: [
    CommonModule,
    FormsModule,          // for [(ngModel)] in list page search box
    ReactiveFormsModule,  // for create/edit reactive forms
    RouterModule,
    TeachersRoutingModule
  ],
  providers: [TeachersService]
})
export class TeachersModule {}
