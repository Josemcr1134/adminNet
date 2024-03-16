import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VademecumService {
  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }
  GetMedicines(limit:number, offset:number, search:string = ''){
    const url = `${this.base_url}/medicine/?limit=${limit}&offset=${offset}&search=${search}`;
    return this.http.get(url, this.header);
  };

  GetMedicine(id:string){
    const url = `${this.base_url}/medicine/${id}/`;
    return this.http.get(url, this.header);
  };

  NewMedicine(data:{}){
    const url = `${this.base_url}/medicine/`;
    return this.http.post(url, data, this.header);
  };

  EditMedicine(data:{}, id:string){
    const url = `${this.base_url}/medicine/${id}/`;
    return this.http.patch(url, data, this.header);
  };

  DeleteMedicine(id:string){
    const url = `${this.base_url}/medicine/${id}/`;
    return this.http.delete(url, this.header);
  };

  AssignMedicineToSpecialtie(data:{}){
    const url = `${this.base_url}/vademecum/`;
    return this.http.post(url, data, this.header);
  };


  DeleteVademecum(id:string){
    const url = `${this.base_url}/vademecum/${id}/`;
    return this.http.delete(url, this.header);
  };

  GetActivesCodes(){
    const url = `${this.base_url}/active-code/`;
    return this.http.get(url, this.header);
  };

  GetPharmaceuticalForm(){
    const url = `${this.base_url}/pharmaceutical-form/`;
    return this.http.get(url, this.header);
  };

  GetUnits(){
    const url = `${this.base_url}/unit/`;
    return this.http.get(url, this.header);
  };
}
