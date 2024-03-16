import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicatorsComponent } from './indicators/indicators.component';
import { GraphicsRoutingModule } from './graphics-statistics.routes';


import { MoreInfoComponent } from './more-info/more-info.component';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    IndicatorsComponent,
    MoreInfoComponent
  ],
  imports: [
    CommonModule,
    GraphicsRoutingModule,
    FormsModule,
    NgxChartsModule
  ]
})
export class GraphicsStatisticsModule { }
