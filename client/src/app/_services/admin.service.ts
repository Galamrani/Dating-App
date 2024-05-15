import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    return this.http.get<User[]>(this.baseUrl + 'admin/users-with-roles');
  }

  updateUserRoles(username: string, roles: string[]) {
    const params = new HttpParams().set('roles', roles.join(','));
    return this.http.post<string[]>(`${this.baseUrl}admin/edit-roles/${username}`, {}, { params });
  }
}
