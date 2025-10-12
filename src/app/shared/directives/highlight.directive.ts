import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  /** The highlight color. Usage: [appHighlight]="'#e7f5ff'" */
  @Input('appHighlight') color: string = '#f1f3f5';

  /** If true, the element starts highlighted on init. */
  @Input() appHighlightActive: boolean = false;

  /** If false, disables hover behavior. */
  @Input() appHighlightHover: boolean = true;

  // Bind styles directly to the host element
  @HostBinding('style.backgroundColor') bg: string | null = null;
  @HostBinding('style.transition') transition = 'background-color .15s ease';

  ngOnInit(): void {
    // set initial state
    this.bg = this.appHighlightActive ? this.color : null;
  }

  @HostListener('mouseenter')
  onEnter() {
    if (this.appHighlightHover) this.bg = this.color;
  }

  @HostListener('mouseleave')
  onLeave() {
    if (this.appHighlightHover && !this.appHighlightActive) this.bg = null;
  }
}
