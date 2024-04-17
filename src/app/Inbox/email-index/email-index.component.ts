import { Component, OnInit } from '@angular/core';
import { EmailService, EmailSummary } from '../email.service';
import { NgForOf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-email-index',
  standalone: true,
  imports: [NgForOf, RouterLink, RouterLinkActive],
  templateUrl: './email-index.component.html',
  styleUrl: './email-index.component.scss',
})
export class EmailIndexComponent implements OnInit {
  emails: EmailSummary[] = [];

  constructor(private emailService: EmailService) {}

  ngOnInit() {
    this.emailService.getEmails().subscribe((emails) => {
      this.emails = emails;
      console.log(emails);
    });
  }

  protected readonly location = location;
}
