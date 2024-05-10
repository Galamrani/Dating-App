import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent {
  @Input() member: Member | undefined;
  newPhotoFile: File | undefined;
  user: User | undefined;
  baseUrl = environment.apiUrl;

  constructor(private accountService: AccountService, private http: HttpClient) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) this.user = user
      }
    })
  }

  onFileSelected(event: any) {
    this.newPhotoFile = event.target.files[0];
  }

  uploadPhoto() {
    if (!this.newPhotoFile || !this.user) return;

    const formData = new FormData();
    formData.append('file', this.newPhotoFile);

    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.user?.token });

    return this.http.post<any>(this.baseUrl + 'users/add-photo', formData, { headers: headers })
  }
}
