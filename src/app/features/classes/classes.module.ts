import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { ClassesService } from './services/classes.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ClassesComponent],
  imports: [CommonModule, FormsModule, SharedModule, ReactiveFormsModule, RouterModule, ClassesRoutingModule],
  providers: [ClassesService]
})
export class ClassesModule {}
