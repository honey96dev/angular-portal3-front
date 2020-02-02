import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@app/_helpers';
import {HumanLayoutComponent} from '@app/views/layouts/human-layout/human-layout.component';
import {HumanFrontComponent} from '@app/human-capital/views/front/human-front.component';
import {HumanMyaccountComponent} from '@app/human-capital/views/myaccount/human-myaccount.component';
import {HumanOurClientsComponent} from '@app/human-capital/views/our-clients/human-our-clients.component';
import {HumanAboutUsComponent} from '@app/human-capital/views/about-us/human-about-us.component';

const routes: Routes = [
  {
    path: '',
    component: HumanLayoutComponent,
    children: [
      {path: '', component: HumanFrontComponent},
      {path: 'myaccount', component: HumanMyaccountComponent, canActivate: [AuthGuard]},
    ]
  },
  {path: 'client/:id', component: HumanOurClientsComponent},
  {path: 'about-us', component: HumanAboutUsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanCapitalRoutingModule { }
