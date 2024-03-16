import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }


  GetUsers(group:number,userType:string ,limit:number, offset:number, search:string ){
      const url = `${this.base_url}/filtering/?groups=${group}&limit=${limit}&offset=${offset}&status=${userType}&search=${search}`;
      return this.http.get(url, this.header);
  };

  UpdateUser(data:{}, id:string){
    const url = `${this.base_url}/users/${id}/`;
    return this.http.patch(url, data, this.header);
  };
}
