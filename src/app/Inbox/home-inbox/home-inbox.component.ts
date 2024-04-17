import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { EmailService } from '../email.service';
import { Location } from '@angular/common';
import { EmailIndexComponent } from '../email-index/email-index.component';

@Component({
  selector: 'app-home-inbox',
  standalone: true,
  imports: [RouterOutlet, EmailIndexComponent],
  templateUrl: './home-inbox.component.html',
  styleUrl: './home-inbox.component.scss',
})
export class HomeInboxComponent implements OnInit {
  constructor(private emailService: EmailService) {}

  ngOnInit() {
    this.emailService.getEmails();
  }
}
