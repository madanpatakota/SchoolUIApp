import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {
  transform(value?: string | number | null): string {
    if (value == null) return '—';
    const digits = String(value).replace(/\D/g, '');
    if (digits.length === 10) return `${digits.slice(0,5)}-${digits.slice(5)}`; // 99999-99999
    if (digits.length === 12 && digits.startsWith('91')) return `+91 ${digits.slice(2,7)}-${digits.slice(7)}`;
    return value.toString();
  }
}
