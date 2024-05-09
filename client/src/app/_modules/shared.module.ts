import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from "ngx-spinner";




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({ positionClass: "toast-bottom-right" }),
    TabsModule.forRoot(),
    NgxSpinnerModule.forRoot({
      type: "square-jelly-box"
    })
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    NgxSpinnerModule,
  ]
})
export class SharedModule { }
