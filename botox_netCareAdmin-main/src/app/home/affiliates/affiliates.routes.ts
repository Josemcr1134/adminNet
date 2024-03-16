import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListAffiliatesComponent } from './list-affiliates/list-affiliates.component';
import { MoreInfoAffiliatesComponent } from './more-info-affiliates/more-info-affiliates.component';
import { ColectivesAffiliatesComponent } from './colectives-affiliates/colectives-affiliates.component';
import { AffiliateMedicInfoComponent } from './affiliate-medic-info/affiliate-medic-info.component';


const routes: Routes = [
    { path: '',  
        children: [
            {path: 'listAffiliates', component: ListAffiliatesComponent},
            {path: 'listColectivesAffiliates', component: ColectivesAffiliatesComponent},
            {path: 'listAffiliate/:id', component: MoreInfoAffiliatesComponent},
            {path: 'AffiliateMedicInfo/:id', component: AffiliateMedicInfoComponent}
        ] },



];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AffiliatesRoutingModule {}
