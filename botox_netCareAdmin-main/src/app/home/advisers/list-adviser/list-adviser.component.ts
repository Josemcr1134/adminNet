import { Component, OnInit } from '@angular/core';
import 'tw-elements';
import { AdvisersService } from '../../../services/advisers.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-list-adviser',
  templateUrl: './list-adviser.component.html',
  styleUrls: ['./list-adviser.component.css']
})
export class ListAdviserComponent implements OnInit {
  public ActiveAdvisers:any[] =[];
  public InactiveAdvisers:any[] =[];
  public limit:number = 10;
  public userTypeEnabled:string ='enabled';
  public userTypeDisabled:string ='disabled';
  public group:number = 1;
  public offsetEnable:number = 0;
  public offsetDisable:number = 0;
  public pageEnable:number = 1;
  public pageDisable:number = 1;
  public resultsEnable:number = 0;
  public resultsDisable:number = 0;
  public searchTerm:string = '';
  constructor(private userSvc:UserService) { }

  ngOnInit(): void {
    this.GetActiveAdviser();
    this.GetInactiveAdvisers();
  }

  GetActiveAdviser(){
    this.userSvc.GetUsers(this.group, this.userTypeEnabled, this.limit, this.offsetEnable, this.searchTerm)
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                 this.resultsEnable = resp.count
                this.ActiveAdvisers = resp.results;
              }
            })
  }

  GetInactiveAdvisers(){
    this.userSvc.GetUsers(this.group, this.userTypeDisabled, this.limit, this.offsetDisable, this.searchTerm)
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                this.resultsDisable = resp.count

                this.InactiveAdvisers = resp.results;
              }
            })
  }
  PaginationEnable(value:number){
    this.pageEnable += value;

    if(this.pageEnable > 0){
      this.offsetEnable = (this.limit * this.pageEnable) -  this.limit;
    } else if(this.pageEnable <  1){
      this.pageEnable === 1;
    } else if(this.ActiveAdvisers.length === 0){
      this.offsetEnable = (this.limit * (this.pageEnable - 1)) -  this.limit;
    }
    this.GetActiveAdviser();
  };
  PaginationDisable(value:number){
    this.pageDisable += value;

    if(this.pageDisable > 0){
      this.offsetDisable = (this.limit * this.pageDisable) -  this.limit;
    } else if(this.pageDisable <  1){
      this.pageDisable === 1;
    } else if(this.InactiveAdvisers.length === 0){
      this.offsetDisable = (this.limit * (this.pageDisable - 1)) -  this.limit;
    }
    this.GetInactiveAdvisers();
  }
}
