import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BusinessLayoutComponent} from '@app/views/layouts/business-layout/business-layout.component';
import {BusinessFrontComponent} from '@app/business/views/front/business-front.component';
import {BusinessContactUsComponent} from '@app/business/views/contact-us/business-contact-us.component';
import {BusinessDirectorBoardComponent} from '@app/business/views/director-board/business-director-board.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessLayoutComponent,
    children: [
      {path: '', component: BusinessFrontComponent},
      {path: 'contact-us', component: BusinessContactUsComponent},
      {path: 'director-board', component: BusinessDirectorBoardComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
