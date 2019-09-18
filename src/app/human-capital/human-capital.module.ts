import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HumanCapitalRoutingModule} from '@app/human-capital/human-capital-routing.module';
import {HumanLayoutComponent} from '@app/views/layouts/human-layout/human-layout.component';
import {HumanFrontComponent} from '@app/human-capital/views/front/human-front.component';
import {SharedModule} from '@app/shared/shared.module';

@NgModule({
  declarations: [
    HumanLayoutComponent,
    HumanFrontComponent,
    HumanLayoutComponent,
    HumanFrontComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HumanCapitalRoutingModule,
  ],
})
export class HumanCapitalModule { }
