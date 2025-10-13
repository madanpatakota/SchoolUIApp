import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { ApiPrefixInterceptor } from './core/interceptors/api-prefix.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent
    ],
    providers:[
      { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true }
],
  imports: [BrowserModule, CoreModule, SharedModule, LayoutModule, AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
