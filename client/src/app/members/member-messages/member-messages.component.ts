import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Message } from 'src/app/_models/message';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  standalone: true,
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css',
  imports: [CommonModule, FormsModule]
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm;
  @Input() username: string | undefined;
  messageContent = '';

  constructor (public messageService: MessageService) {}
  
  ngOnInit(): void {}

  sendMessage() { 
    if(!this.username) return;
    this.messageService.sendMessage(this.username, this.messageContent).then(() => {this.messageForm?.reset()});  
  }

}
