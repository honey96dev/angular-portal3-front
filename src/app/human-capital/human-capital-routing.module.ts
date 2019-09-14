import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HumanLayoutComponent} from '@app/views/layouts/human-layout/human-layout.component';
import {HumanFrontComponent} from '@app/human-capital/views/front/human-front.component';

const routes: Routes = [
  {
    path: '',
    component: HumanLayoutComponent,
    children: [
      {path: '', component: HumanFrontComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanCapitalRoutingModule { }
