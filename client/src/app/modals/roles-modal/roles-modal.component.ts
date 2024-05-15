import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrl: './roles-modal.component.css'
})
export class RolesModalComponent implements OnInit{
  username = '';
  availableRoles: any[] = [];
  selectedRoles: any[] = [];


  constructor (public bsModalRef: BsModalRef) {}
  
  ngOnInit(): void {
  }

  updateChecked(chechedValue: string) {
    const index = this.selectedRoles.indexOf(chechedValue);
    index !== -1 ? this.selectedRoles.splice(index,1) : this.selectedRoles.push(chechedValue);
  }
}
