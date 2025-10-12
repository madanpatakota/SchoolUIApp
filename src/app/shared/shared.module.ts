import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { HasRoleDirective } from './directives/has-role.directive';
// import { AutofocusInvalidDirective } from './directives/autofocus-invalid.directive';
import { InitialsPipe } from './pipes/initials.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    InitialsPipe,
    PhonePipe,
    HighlightDirective
  ],
  imports: [CommonModule],
  exports: [
    InitialsPipe,
    PhonePipe,
    HighlightDirective
  ]
})
export class SharedModule {}
