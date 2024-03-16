import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansComponent } from './plans/plans.component';
import { ServicesComponent } from './services/services.component';
import { SpecialtiesComponent } from './specialties/specialties.component';
import { ConfigsRoutingModule } from './config.routes';
import { EditServicesComponent } from './edit-services/edit-services.component';
import { SpecialitiesDetailsComponent } from './specialities-details/specialities-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPlansComponent } from './edit-plans/edit-plans.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { MedicineDetailsComponent } from './medicine-details/medicine-details.component';
import { MedicalServiceDetailComponent } from './medical-service-detail/medical-service-detail.component';
import { MedicalServicesComponent } from './medical-services/medical-services.component';
import { EditSpecialtiesComponent } from './edit-specialties/edit-specialties.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';



@NgModule({
  declarations: [
    PlansComponent,
    ServicesComponent,
    SpecialtiesComponent,
    EditServicesComponent,
    SpecialitiesDetailsComponent,
    EditPlansComponent,
    MedicinesComponent,
    MedicineDetailsComponent,
    MedicalServiceDetailComponent,
    MedicalServicesComponent,
    EditSpecialtiesComponent,
    ProductsComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ConfigsRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class ConfigsModule { }
