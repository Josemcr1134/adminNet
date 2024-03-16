import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffiliatesService {

  public base_url:string = environment.base_url;

  get header() {
    return {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('net_token')}`
      }
    }
  }

  constructor( private http:HttpClient) { }


  GetUsersByPlan(plan_id:string, limit:number, offset:number, search:string){
    const url = `${this.base_url}/plan-service/list_affiliates_by_plan/?plan_id=${plan_id}&limit=${limit}&offset=${offset}&search=${search}`;
    return this.http.get(url, this.header);
  };

  GetAfilliateByID(uid:string ) {
    const url = `${this.base_url}/affiliates/${uid}/`;
    return this.http.get(url, this.header);
  };

  UpdateAffiliate(uid:string, data:{}){
    const url = `${this.base_url}/users/${uid}/`;
    return this.http.patch(url, data, this.header);
  };


}
