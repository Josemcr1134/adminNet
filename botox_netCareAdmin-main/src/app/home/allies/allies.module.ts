import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAlliesComponent } from './new-allies/new-allies.component';
import { ListAlliesComponent } from './list-allies/list-allies.component';
import { AlliesRoutingModule } from './allies.routes';
import { FormsModule } from '@angular/forms';

import { NgxDropzoneModule } from 'ngx-dropzone';

import { EnabledDisabledAllieComponent } from './enabled-disabled-allie/enabled-disabled-allie.component';
import { AproveAllieDocsComponent } from './aprove-allie-docs/aprove-allie-docs.component';
import { AlliesServicesaComponent } from './allies-servicesa/allies-servicesa.component';
import { AlliesPendingAprovedServicesComponent } from './allies-pending-aproved-services/allies-pending-aproved-services.component';
import { DeclineDiscountServicesComponent } from './decline-discount-services/decline-discount-services.component';
import { AproveDeclineAlliesServicesComponent } from './aprove-decline-allies-services/aprove-decline-allies-services.component';
import { SpecialtiesAsignedComponent } from './specialties-asigned/specialties-asigned.component';



@NgModule({
  declarations: [
    NewAlliesComponent,
    ListAlliesComponent,
    EnabledDisabledAllieComponent,
    AproveAllieDocsComponent,
    AlliesServicesaComponent,
    AlliesPendingAprovedServicesComponent,
    DeclineDiscountServicesComponent,
    AproveDeclineAlliesServicesComponent,
    SpecialtiesAsignedComponent,
  ],
  imports: [
    CommonModule,
    AlliesRoutingModule,
    FormsModule,
    NgxDropzoneModule
  ]
})
export class AlliesModule { }
