import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StudentsRoutingModule } from './students-routing.module';
import { ListStudentsComponent } from './pages/list-students/list-students.component';
import { CreateStudentComponent } from './pages/create-student/create-student.component';
import { EditStudentComponent } from './pages/edit-student/edit-student.component';
import { StudentsService } from './services/students.service';

@NgModule({
  declarations: [
    ListStudentsComponent,
    CreateStudentComponent,
    EditStudentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,            // small helpers if you add template bits
    ReactiveFormsModule,    // reactive forms (create/edit)
    RouterModule,
    StudentsRoutingModule
  ],
  providers: [StudentsService]
})
export class StudentsModule {}
