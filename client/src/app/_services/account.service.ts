import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient) { }

  login(model: User) {
    return this.handleResponse(this.http.post<User>(this.baseUrl + "account/login", model))
  }

  register(model: User) {
    return this.handleResponse(this.http.post<User>(this.baseUrl + "account/register", model))
  }

  private handleResponse(observable: Observable<User>): Observable<void> {
    // Using the pipe operator to chain the observable for data transformation
    // Using the map to extract user data from the response
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
  }

  setCurrentUser(user: User) {
    this.currentUser.next(user);
  }
}
