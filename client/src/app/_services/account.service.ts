import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;

  // currentUser used like a box to hold the current user info, initially empty
  private currentUser = new BehaviorSubject<User | null>(null);

  // currentUser$ listens for changes inside the box and emits the latest value in the box.
  // Read-only observable, components and services can subscribe for updates, but cannot modify its.
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient, private presenceService: PresenceService) { }

  login(model: User) {
    return this.handleResponse(this.http.post<User>(this.baseUrl + "account/login", model))
  }

  register(model: User) {
    return this.handleResponse(this.http.post<User>(this.baseUrl + "account/register", model))
  }

  private handleResponse(observable: Observable<User>): Observable<void> {
    return observable.pipe(
      map(user => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.setCurrentUser(user);
        }
      })
    );
  }

  logout() {
    this.currentUser.next(null);
    localStorage.removeItem("user");
    this.presenceService.stopHubConnection();
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodeedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.next(user);
    this.presenceService.createHubConnection(user);
  }

  getDecodeedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
