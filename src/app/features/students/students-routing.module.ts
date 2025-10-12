import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStudentsComponent } from './pages/list-students/list-students.component';
import { CreateStudentComponent } from './pages/create-student/create-student.component';
import { EditStudentComponent } from './pages/edit-student/edit-student.component';

const routes: Routes = [
  { path: '', component: ListStudentsComponent },
  { path: 'create', component: CreateStudentComponent },
  { path: ':id/edit', component: EditStudentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule {}
