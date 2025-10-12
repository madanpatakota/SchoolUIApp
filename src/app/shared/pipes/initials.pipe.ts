import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'initials' })
export class InitialsPipe implements PipeTransform {
  transform(value?: string | null): string {
    if (!value) return '';
    const parts = value.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] ?? '' : '';
    return (first + last).toUpperCase();
  }
}
