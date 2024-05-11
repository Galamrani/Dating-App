import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, take, tap, throwError } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
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

  constructor(private accountService: AccountService, private http: HttpClient, private memberService: MembersService, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) this.user = user
      }
    })
  }

  onFileSelected(event: any) {
    console.log(event.target.files[0]);
    this.newPhotoFile = event.target.files[0];
  }

  uploadPhoto() {
    if (!this.newPhotoFile || !this.user || !this.member) return;

    const formData = new FormData();
    formData.append('file', this.newPhotoFile);

    this.memberService.updateMemberPhotos(this.member, formData).subscribe({
      next: _ => this.toastr.success('Upload photo successfully'),
    })
  }

}
