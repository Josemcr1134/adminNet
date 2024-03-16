import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAdviserComponent } from './new-adviser/new-adviser.component';
import { ListAdviserComponent } from './list-adviser/list-adviser.component';
import { AdvisersRoutingModule } from './advisers.routes';
import { DisabledEnabledAdviserComponent } from './disabled-enabled-adviser/disabled-enabled-adviser.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NewAdviserComponent,
    ListAdviserComponent,
    DisabledEnabledAdviserComponent
  ],
  imports: [
    CommonModule,
    AdvisersRoutingModule,
    FormsModule
  ]
})
export class AdvisersModule { }
