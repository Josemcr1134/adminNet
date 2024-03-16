import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvisersService {

  public base_url:string =  environment.base_url;

  get header() {
    return {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }

  // CREATE ADVISER

  NewAdviser(body:{}){
    const url = `${this.base_url}/register/advisers/`;
    return this.http.post(url, body, this.header);
  }

  // UPDATE ADVISER

  UpdateAdviser(id:string, body:{}){
    const url = `${this.base_url}/users/${id}/`;
    return this.http.patch(url,body ,this.header);
  }

  // GET BY STATUS ADVISER

  GetAdviserByStatus(is_active:boolean){
    const url = `${this.base_url}/advisers/${is_active}/`;
    return this.http.get(url, this.header);
  }

}
