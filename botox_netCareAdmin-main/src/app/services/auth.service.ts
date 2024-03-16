import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public base_url:string =  environment.base_url;
  
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }


  createUser(body:{}){
    const url = `${this.base_url}/users/`;
    return this.http.post(url, body, this.header);
  };

  login(body:FormData){
    const url = `${this.base_url}/login/`;
    return this.http.post(url, body);
  };

  ChangePassword(data:{}){
    const url = `${this.base_url}/password/change/`;
    return this.http.post(url, data, this.header);
  };
}
