import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAffiliatesComponent } from './list-affiliates/list-affiliates.component';
import { AffiliatesRoutingModule } from './affiliates.routes';
import { MoreInfoAffiliatesComponent } from './more-info-affiliates/more-info-affiliates.component';
import { ColectivesAffiliatesComponent } from './colectives-affiliates/colectives-affiliates.component';
import { AffiliateMedicInfoComponent } from './affiliate-medic-info/affiliate-medic-info.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListAffiliatesComponent,
    MoreInfoAffiliatesComponent,
    ColectivesAffiliatesComponent,
    AffiliateMedicInfoComponent
  ],
  imports: [
    CommonModule,
    AffiliatesRoutingModule,
    FormsModule
  ]
})
export class AffiliatesModule { }
