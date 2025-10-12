import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { ListStudentsComponent } from './features/students/pages/list-students/list-students.component';
import { CreateStudentComponent } from './features/students/pages/create-student/create-student.component';
import { ClassesComponent } from './features/classes/classes.component';

@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [BrowserModule, CoreModule, SharedModule, LayoutModule, AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
