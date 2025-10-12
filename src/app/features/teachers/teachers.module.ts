import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersRoutingModule } from './teachers-routing.module';
import { ListTeachersComponent } from './pages/list-teachers/list-teachers.component';

@NgModule({
  declarations: [ListTeachersComponent],
  imports: [CommonModule, TeachersRoutingModule]
})
export class TeachersModule {}
