import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { catchError, map, of, take, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers() {
    if (this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    )
  }

  getMember(usernaem: string) {
    const member = this.members.find(x => x.userName === usernaem);
    if (member) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + usernaem);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member }
      })
    )
  }

  updateMemberPhotos(member: Member, formData: FormData) {
    return this.http.post<any>(this.baseUrl + 'users/add-photo', formData, { reportProgress: true })
      .pipe(
        catchError(error => {
          console.error('Upload failed:', error);
          return error;
        }),
        map(response => {
          if (member) {
            member.photos.push(response);
          }
          return response;
        })
      );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

}
