import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTeachersComponent } from './pages/list-teachers/list-teachers.component';

const routes: Routes = [
  { path: '', component: ListTeachersComponent }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class TeachersRoutingModule {}
