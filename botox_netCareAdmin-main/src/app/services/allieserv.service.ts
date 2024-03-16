import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllieservService {

  public base_url:string = environment.base_url;

  get header() {
    return {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('net_token')}`
      }
    }
  }

  constructor( private http:HttpClient) { }

  updateAllies(id:string, body:{}){
    const url = `${this.base_url}/users/${id}/`;
    return this.http.patch(url,body ,this.header);
  };

  GetAlliesOrderCollects(medical_id:string, limit:number, offset:number){
    const url = `${this.base_url}/wallet/?medical_id=${medical_id}&limit=${limit}&offset=${offset}`;
    return this.http.get(url, this.header);
  };

  UpdateAllieOrderCollect(data:FormData,id:string ){
    const url = `${this.base_url}/wallet/${id}/`;
    return this.http.put(url,data, this.header);
  };

  GetAttendedAppointmentsByAllie(medical_id:string , limit:number, offset:number){
    const url = `${this.base_url}/appointment/appointment_attended/?medical_id=${medical_id}&limit=${limit}&offset=${offset}`;
    return this.http.get(url, this.header);
  };


}
