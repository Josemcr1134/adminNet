import { Component, OnInit } from '@angular/core';
import { IndicatorsService } from '../../../services/indicators.service';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.css']
})
export class IndicatorsComponent implements OnInit {
  multi: any;
  multiAfiliations: any;
  public total_services_paid:number = 0;
  public total_memberships_paid:number = 0;
  public total_services:number = 0;
  public total_memberships:number =0;
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Tiempo';
  yAxisLabel: string = 'Ventas';

  yAxisLabelA: string = 'Afiliaciones';
  timeline: boolean = true;
  public data:any;
  public afiliationsData:any;
  colorScheme:any = {
    domain: ['#0FB6CC']
  };

  public start_date:string = '';
  public end_date:string = '';


  ngOnInit(): void {
    this.GetIndicators();
  };
  constructor(private indicatorsSvc:IndicatorsService){}

  GetIndicators(){
    this.indicatorsSvc.GetIndicators()
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              this.total_services_paid = resp.total_services_paid;
              this.total_memberships_paid = resp.total_membership_paid;
              this.total_services = resp.total_sales;
              this.total_memberships = resp.total_membership;
                let data = {
                  "name": "Ventas",
                  "series": resp.total_services
                };

                let affiliations = {
                  name:'Afiliaciones',
                  series: resp.total_memberships
                };

                this.multi = JSON.parse(JSON.stringify(data).replace(/^\{(.*)\}$/,"[ { $1 }]"));
                this.multiAfiliations = JSON.parse(JSON.stringify(affiliations).replace(/^\{(.*)\}$/,"[ { $1 }]"));
            }
          });
  };

  GetIndicatorsByIntervallDate(){
    this.indicatorsSvc.GetIndicatorsByIntervall(this.start_date, this.end_date)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.total_services_paid = resp.total_services_paid;
                  this.total_memberships_paid = resp.total_membership_paid;
                  this.total_services = resp.total_sales;
                  this.total_memberships = resp.total_membership;
                    let data = {
                      "name": "Ventas",
                      "series": resp.total_services
                    };

                    let affiliations = {
                      name:'Afiliaciones',
                      series: resp.total_memberships
                    };

                    this.multi = JSON.parse(JSON.stringify(data).replace(/^\{(.*)\}$/,"[ { $1 }]"));
                    this.multiAfiliations = JSON.parse(JSON.stringify(affiliations).replace(/^\{(.*)\}$/,"[ { $1 }]"));

                }
              })
  };


  Reload(){
    this.start_date = '';
    this.end_date = '';
    this.GetIndicators();
  };




}

