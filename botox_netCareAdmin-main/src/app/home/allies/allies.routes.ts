 import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NewAlliesComponent } from './new-allies/new-allies.component';
import { ListAlliesComponent } from './list-allies/list-allies.component';
import { AproveAllieDocsComponent } from './aprove-allie-docs/aprove-allie-docs.component';
import { EnabledDisabledAllieComponent } from './enabled-disabled-allie/enabled-disabled-allie.component';
import { AlliesServicesaComponent } from './allies-servicesa/allies-servicesa.component';
import { AlliesPendingAprovedServicesComponent } from './allies-pending-aproved-services/allies-pending-aproved-services.component';
import { DeclineDiscountServicesComponent } from './decline-discount-services/decline-discount-services.component';
import { AproveDeclineAlliesServicesComponent } from './aprove-decline-allies-services/aprove-decline-allies-services.component';
import { SpecialtiesAsignedComponent } from './specialties-asigned/specialties-asigned.component';


const routes: Routes = [
    { path: '',
        children: [
             {path:'NewAllie', component: NewAlliesComponent},
             {path:'AlliesList', component:ListAlliesComponent},
             {path:'AlliesServices/:id', component:AlliesServicesaComponent},
             {path:'AlliesServicesDiscounts/:id', component:DeclineDiscountServicesComponent},
             {path:'AlliesAprove/:id/:name', component:AproveAllieDocsComponent},
             {path:'AlliesAprove&PendingServices/:id/:name', component:AlliesPendingAprovedServicesComponent},
             {path:'AlliesAprove&DeclineServices/:id/:action', component:AproveDeclineAlliesServicesComponent},
             {path:'AlliesEnableDisable/:id/:type', component:EnabledDisabledAllieComponent},
             {path: 'SpecialtiesAsigned/:id/:type', component:SpecialtiesAsignedComponent}
        ] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlliesRoutingModule {}
