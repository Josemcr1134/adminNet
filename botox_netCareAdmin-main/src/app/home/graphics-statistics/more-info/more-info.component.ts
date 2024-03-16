import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndicatorsService } from '../../../services/indicators.service';
import { LoginComponent } from '../../../auth/login/login.component';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent implements OnInit {
  public ID:string = '';
  public statisticType!:number;
  public Sales:any[] = [];
  public Memberships:any[] = [];
  public start_date:string = '';
  public end_date:string = '';

  constructor( private activatedRoute:ActivatedRoute, private indicatorsSvc:IndicatorsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id,  typeStatistic}) => {
      this.ID = id
      this.statisticType = typeStatistic
    });
    this.GetSalesDetails();
    this.GetMembershipsDetails();
  }


  GetSalesDetails(){
      this.indicatorsSvc.GetSalesIndicatorsDetail()
                .subscribe({
                  error:(err:any) => {
                    console.log(err);
                  },
                  next:(resp:any) => {
                    this.Sales = resp;
                  }
                });
  };

  GetSalesIntervallDates(){
    this.indicatorsSvc.GetSalesIndicatorsDetailByIntervall(this.start_date, this.end_date)
                .subscribe({
                  error:(err:any) => {
                    console.log(err);
                  },
                  next:(resp:any) => {
                    this.Sales = resp;
                  }
                })
  }

  GetMembershipsDetails(){
    this.indicatorsSvc.GetMembershipsIndicatorsDetail()
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              console.log(resp);
              this.Memberships = resp;
            }

          });
  };

  GetMembershipsIntervallDates(){
    this.indicatorsSvc.GetMembershipsIndicatorsDetailByIntervall(this.start_date, this.end_date)
                .subscribe({
                  error:(err:any) => {
                    console.log(err);
                  },
                  next:(resp:any) => {
                    this.Memberships = resp;
                  }
                })
  };

  Reload(sales:boolean){
    this.start_date = '';
    this.end_date = '';
    if(sales){
      this.GetSalesDetails();
    } else {
      this.GetMembershipsDetails();
    };
  };

}
