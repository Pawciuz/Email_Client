import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  url = 'https://api.angular-email.com';

  constructor(private httpClient: HttpClient) {}

  getEmails() {
    return this.httpClient.get<EmailSummary[]>(`${this.url}/emails`);
  }
}
