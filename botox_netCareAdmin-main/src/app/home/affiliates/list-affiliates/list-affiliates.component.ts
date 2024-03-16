import 'tw-elements';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AffiliatesService } from '../../../services/affiliates.service';
import { ConfigService } from '../../../services/config.service';
@Component({
  selector: 'app-list-affiliates',
  templateUrl: './list-affiliates.component.html',
  styleUrls: ['./list-affiliates.component.css']
})
export class ListAffiliatesComponent implements OnInit {
  public Users:any [] = [];
  public Plans:any[] = [];
  public plan_id:string = '';
  public offset:number = 0;
  public page:number = 0;
  public limit:number = 10;
  public previous:any;
  public next:any;
  public count:number = 0;
  public plan_name:string ='';
  public searchTerm:string = '';
  constructor(private affiliateSvc:AffiliatesService, private router:Router, private configSvc:ConfigService) { }

  ngOnInit(): void {
    this.GetPlans();

  }

  GetPlans(){
    this.configSvc.GetPlans()
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                this.Plans = resp.results;

                this.GetAffiliatesByPlan(resp.results[0].id)
              }
            });
  };

  GetAffiliatesByPlan(plan_id:string ){
    this.plan_id = plan_id;
    this.affiliateSvc.GetUsersByPlan(plan_id, this.limit, this.offset, this.searchTerm)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.Users = resp.results;
                  this.next = resp.next;
                  this.previous = resp.previous;
                  this.count = resp.count
                }
              });
  };


  Pagination(value:number){
    this.page += value;

    if(this.page > 0){
      this.offset = (this.limit * this.page) -  this.limit;
    } else if(this.page <  1){
      this.page === 1;
    } else if(this.Users.length === 0){
      this.offset = (this.limit * (this.page - 1)) -  this.limit;
    }
    this.GetAffiliatesByPlan(this.plan_id);
  };


}
