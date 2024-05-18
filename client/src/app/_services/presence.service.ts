import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject, take } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;
  private onLineUserSource = new BehaviorSubject<string[]>([]);
  onLineUsers$ = this.onLineUserSource.asObservable();

  constructor(private toastr: ToastrService, private router: Router) { }

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => console.log(error));
    
    this.hubConnection.on('UserIsOnline', username => {
      this.onLineUsers$.pipe(take(1)).subscribe({
        next: usernames => {
          this.toastr.info(username + ' has connected') 
          this.onLineUserSource.next([...usernames, username])
        }
      })
    });
    
    this.hubConnection.on('UserIsOffline', username => {
      this.toastr.warning(username + ' has disconnected'),
      this.onLineUsers$.pipe(take(1)).subscribe({
        next: usernames => this.onLineUserSource.next(usernames.filter(x => x !== username ))
      })
    });
    
    this.hubConnection.on('GetOnlineUsers', username => this.onLineUserSource.next(username));
    
    this.hubConnection.on('NewMessageReceivd', ({username, knownAs}) => {
      this.toastr.success('New message from ' + knownAs)
        .onTap
        .pipe(take(1))
        .subscribe({
          next: () => this.router.navigateByUrl('/members/' + username + '?tab=Messages')
        })
    });
  }

  stopHubConnection() {
    this.hubConnection?.stop().catch(error => console.log(error));
  }


}
