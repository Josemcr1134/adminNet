import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndicatorsService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('net_token')}`
      }
    }
  };
  constructor(private http:HttpClient) { }

  GetIndicators(){
    const url = `${this.base_url}/indicator-ally/get_admin_indicators/`;
    return this.http.get(url, this.header);
  };

  GetSalesIndicatorsDetail(){
    const url = `${this.base_url}/indicator-admin/get_detail_sales/`;
    return this.http.get(url, this.header);
  };

  GetMembershipsIndicatorsDetail(){
    const url = `${this.base_url}/indicator-admin/get_detail_affiliates/`;
    return this.http.get(url, this.header);
  };

  GetSalesIndicatorsDetailByIntervall(start_date:string, end_date:string){
    const url = `${this.base_url}/indicator-admin/get_detail_sales/?start_date=${start_date}&end_date=${end_date}`;
    return this.http.get(url, this.header);
  };


  GetMembershipsIndicatorsDetailByIntervall(start_date:string, end_date:string){
    const url = `${this.base_url}/indicator-admin/get_detail_affiliates/?start_date=${start_date}&end_date=${end_date}`;
    return this.http.get(url, this.header);
  };

  GetIndicatorsByIntervall(start_date:string, last_date:string){
    const url =`${this.base_url}/indicator-ally/get_admin_indicators/?start_date=${start_date}&end_date=${last_date}`;
    return this.http.get(url, this.header);
  };
}
