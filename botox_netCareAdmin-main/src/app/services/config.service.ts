import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public base_url =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }

  // Config Plan Services

  newPLan(body:any){
    const url = `${this.base_url}/plan/`;
    return this.http.post(url, body, this.header);
  };

  GetPlan(package_id:string){
    const url = `${this.base_url}/plan/${package_id}/`;
    return this.http.get(url, this.header);
  };

  GetPlans(search:string =''){
    const url = `${this.base_url}/plan/?search=${search}`;
    return this.http.get(url, this.header);
  };

  EditPlan(pid:string, body:{}){
    const url = `${this.base_url}/plan/${pid}/`;
    return this.http.patch(url, body, this.header)
  };

  DeletePlan(p_id:string){
    const url = `${this.base_url}/plan/${p_id}`;
    return this.http.delete(url, this.header);
  };

  DuplicatePlan(data:{}){
    const  url = `${this.base_url}/plan-service/duplicate_plan/`;
    return this.http.post(url, data, this.header);
  };

  // Config General Services

  GetGeneralServices(search:string = ''){
    const url = `${this.base_url}/general-service/?search=${search}`;
    return this.http.get(url, this.header);
  };

  GetGeneralService(s_id:string){
    const url = `${this.base_url}/general-service/${s_id}/`;
    return this.http.get(url, this.header);
  };

  NewGeneralService(body:{}){
    const url = `${this.base_url}/general-service/`;
    return this.http.post(url, body, this.header);
  };

  EditGeneralService(s_id:string, body:{}){
    const url = `${this.base_url}/general-service/${s_id}/`;
    return this.http.patch(url, body, this.header);
  };

  DeleteGeneralService(s_id:string){
    const url = `${this.base_url}/general-service/${s_id}/`;
    return this.http.delete(url, this.header);
  };

  // Config Medical Specialities

  NewMedicalSpecialtie(data:FormData){
    const url = `${this.base_url}/specialty/`;
    return this.http.post(url, data, this.header);
  };

  GetAllMedicalSpecialties(offset:number, limit:number, search:string =''){
    const url = `${this.base_url}/specialty/?offset=${offset}&limit=${limit}&search=${search}`;
    return this.http.get(url, this.header);
  };

  GetMedicalSpecialtieById(id:string){
    const url = `${this.base_url}/specialty-vademecum-service/${id}/`;
    return this.http.get(url, this.header);
  };

  DeleteMedicalSpecialtie(id:string){
    const url = `${this.base_url}/specialty/${id}/`;
    return this.http.delete(url, this.header);
  };

  EditSpecialtie(id:string, data:{}){
    const url = `${this.base_url}/specialty/${id}/`;
    return this.http.patch(url, data,this.header);
  }

  UpdateMedicalSpecialtie(id:string, data:{}){
    const url = `${this.base_url}/specialty-vademecum-service/${id}`;
    return this.http.patch(url, data, this.header);
  };


  // Config Services assigned to plans

  GetServicesAssignedToPlan(id:string){
    const url = `${this.base_url}/plan-service/${id}/`
    return this.http.get(url, this.header);
  };

  AssignServiceToPlan(data:{}){
    const url = `${this.base_url}/plan-service/`;
    return this.http.post(url, data, this.header);
  };

  DeleteAssignmentServiceToPlan(id:string){
    const url = `${this.base_url}/plan-service/${id}/`;
    return this.http.delete(url, this.header);
  };

  // Products

  NewProduct(data:FormData){
    const url = `${this.base_url}/products/`;
    return this.http.post(url, data, this.header);
  };

  GetProducts(offset:number, limit:number, search:string){
    const url = `${this.base_url}/products/?limit=${limit}&offset=${offset}&search=${search}`;
    return this.http.get(url, this.header);
  };

  GetProductByID(id:string){
    const url =  `${this.base_url}/products/${id}/`;
    return this.http.get(url, this.header);
  };

  EditProduct(id:string, data:{}){
    const url = `${this.base_url}/products/${id}/`;
    return this.http.patch(url, data, this.header);
  };

  DeleteProduct(id:string){
    const url = `${this.base_url}/products/${id}/`;
    return this.http.delete(url, this.header);
  };


  // PLATFORM SERVICES

  GetPlatformServices(){
    const url = `${this.base_url}/service-platform/`;
    return this.http.get(url, this.header);
  };

}
