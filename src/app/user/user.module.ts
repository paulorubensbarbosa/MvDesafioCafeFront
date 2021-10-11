import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './pages/edit/edit.component';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    FormComponent,
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
