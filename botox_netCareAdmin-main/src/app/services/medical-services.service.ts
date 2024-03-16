import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalsServicesService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }



  NewMedicalService(data:FormData){
    const url = `${this.base_url}/service/`;
    return this.http.post(url,data, this.header );
  };

  GetMedicalServices(limit:number, offset:number, search:string = ''){
    const url = `${this.base_url}/service/?limit=${limit}&offset=${offset}&search=${search}`;
    return this.http.get(url, this.header );
  };
  GetMedicalServicesByID(id:string){
    const url = `${this.base_url}/service/${id}/`;
    return this.http.get(url, this.header );
  };

  DeleteMedicalService(id:string){
    const url = `${this.base_url}/service/${id}/`;
    return this.http.delete(url, this.header);
  };

  UpdateMedicalService(data:{}, id:string){
    const url = `${this.base_url}/service/${id}/`;
    return this.http.patch(url, data, this.header);
  };


  GetServiceTypes(){
    const url = `${this.base_url}/service-type/`;
    return this.http.get(url, this.header);
  };


}
