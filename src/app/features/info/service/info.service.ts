// src/app/features/info/services/info.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class InfoService {
  constructor(private http: HttpClient) {}
  sendMessage(payload: {name: string; email: string; message: string}) {
    return this.http.post('messages', payload);
  }
}
