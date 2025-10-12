import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { ListTeachersComponent } from './pages/list-teachers/list-teachers.component';
import { CreateTeacherComponent } from './pages/create-teacher/create-teacher.component';
import { EditTeacherComponent } from './pages/edit-teacher/edit-teacher.component';

const routes: Routes = [
  { path: '', component: TeachersComponent },           // shell header + list
  { path: 'create', component: CreateTeacherComponent },
  { path: ':id/edit', component: EditTeacherComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule {}
