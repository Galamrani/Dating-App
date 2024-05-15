import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from "ngx-spinner";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({ positionClass: "toast-bottom-right" }),
    TabsModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: "square-jelly-box" }),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [
    BsDropdownModule, 
    ToastrModule,
    TabsModule,
    NgxSpinnerModule,
    PaginationModule,
    ButtonsModule,
    ModalModule,
  ]
})
export class SharedModule { }
