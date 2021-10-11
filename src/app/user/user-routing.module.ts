import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './pages/edit/edit.component';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'new', component: FormComponent },
  { path: 'edit', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
