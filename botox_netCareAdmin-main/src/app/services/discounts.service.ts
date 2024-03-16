import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {
  public base_url =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }


  GetDiscountsByAllieAndStatus(uid:string, status:string){
    const url = `${this.base_url}/discount/user/${uid}/status/${status}/`;
    return this.http.get(url, this.header);
  };

  ChangeDiscountStatus(discount:string, data:{}){
    const url = `${this.base_url}/discount/${discount}/response/`;
    return this.http.put(url, data,this.header);
  };


}
