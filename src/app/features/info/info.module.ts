import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfoRoutingModule } from './info-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, AboutComponent, ContactComponent],
  imports: [CommonModule, RouterModule,FormsModule, InfoRoutingModule]
})
export class InfoModule {}
