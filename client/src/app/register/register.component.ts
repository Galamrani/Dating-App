import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MembersService } from '../_services/members.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  constructor(private accountService: AccountService, private toastr: ToastrService, private router: Router, private memberService: MembersService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      gender: new FormControl('male', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      knownAs: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
    })
  }

  register() {
    const dob = this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
    const values = {...this.registerForm.value, dateOfBirth: dob};
    this.accountService.register(values).subscribe({
      next: () => {
        this.router.navigateByUrl('/members').then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 2000); 
        });
      },
      error: error => {
        this.validationErrors = error;
      }
    })
  }

  cancel() {
    this.cancelRegister.emit(false)
  }

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    const theDob = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes()-theDob.getTimezoneOffset())).toISOString().slice(0,10);
  }
}
