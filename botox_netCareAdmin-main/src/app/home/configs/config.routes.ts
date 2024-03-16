import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PlansComponent } from './plans/plans.component';
import { ServicesComponent } from './services/services.component';
import { SpecialtiesComponent } from './specialties/specialties.component';
import { EditServicesComponent } from './edit-services/edit-services.component';
import { SpecialitiesDetailsComponent } from './specialities-details/specialities-details.component';
import { EditPlansComponent } from './edit-plans/edit-plans.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { MedicineDetailsComponent } from './medicine-details/medicine-details.component';
import { MedicalServicesComponent } from './medical-services/medical-services.component';
import { MedicalServiceDetailComponent } from './medical-service-detail/medical-service-detail.component';
import { EditSpecialtiesComponent } from './edit-specialties/edit-specialties.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';



const routes: Routes = [
    { path: '' ,
        children: [
            {path:'Plans', component:PlansComponent},
            {path:'EditPlans/:id/:issue', component:EditPlansComponent},
            {path:'Services', component:ServicesComponent},
            {path:'EditService/:id', component:EditServicesComponent},
            {path:'Specialties', component:SpecialtiesComponent},
            {path:'SpecialtyDetails/:id', component:SpecialitiesDetailsComponent},
            {path:'EditSpecialty/:id/:name/:desc/:image', component:EditSpecialtiesComponent},
            {path:'Medicine', component:MedicinesComponent},
            {path:'Medicine/:id', component:MedicineDetailsComponent},
            {path:'MedicalService', component:MedicalServicesComponent},
            {path:'MedicalService/:id', component:MedicalServiceDetailComponent},
            {path:'Products', component:ProductsComponent},
            {path:'Products/:id', component:ProductDetailsComponent},
        ]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfigsRoutingModule {}
