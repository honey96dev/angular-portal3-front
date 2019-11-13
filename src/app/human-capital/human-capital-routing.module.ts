import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@app/_helpers';
import {HumanLayoutComponent} from '@app/views/layouts/human-layout/human-layout.component';
import {HumanFrontComponent} from '@app/human-capital/views/front/human-front.component';
import {HumanMyaccountComponent} from '@app/human-capital/views/myaccount/human-myaccount.component';

const routes: Routes = [
  {
    path: '',
    component: HumanLayoutComponent,
    children: [
      {path: '', component: HumanFrontComponent},
      {path: 'myaccount', component: HumanMyaccountComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanCapitalRoutingModule { }
