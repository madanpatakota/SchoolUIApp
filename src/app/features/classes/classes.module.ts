import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { ClassesService } from './services/classes.service';

@NgModule({
  declarations: [ClassesComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ClassesRoutingModule],
  providers: [ClassesService]
})
export class ClassesModule {}
