import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }


  // PRE REGISTER SPECIALIST (LEGAL STAFF)
  NewLegalStaff(data:{}){
    const url = `${this.base_url}/register/legal-staff/`;
    return this.http.post(url, data, this.header);
  };
  
  // PRE REGISTER SPECIALIST (NATURAL)
  NewNaturalDoctor(data:{}){
    const url = `${this.base_url}/register/natural_doctor/`;
    return this.http.post(url, data, this.header);
  };


  // ASSIGN LICENSE SPECIALTY
  NewLicenseSpecialty(data:{}){
    const url = `${this.base_url}/license-specialty/`;
    return this.http.post(url, data, this.header);
  };

  // ASSIGN LICENSE TO MEDICAL
  NewLicenseToMedical(data:{}){
    const url = `${this.base_url}/medical-specialty/`;
    return this.http.post(url, data, this.header);
  };

  // DISABLE LICENCSE TO MEDICAL
  DisableSpecialtyLicense(id:string, data:{}){
    const url = `${this.base_url}/license-specialty/${id}/`;
    return this.http.patch(url , data, this.header); 
  };

  // DELETE LICENSE TO MEDICAL
  DeleteSpecialtyLicense(id:string){
    const url = `${this.base_url}/license-specialty/${id}/`;
    return this.http.delete(url, this.header);
  };

  // GET ALLIES LICENCES
  GetAlliesLicences(id:number){
    const url = `${this.base_url}/license-specialty/user/${id}/`;
    return this.http.get(url, this.header);
  };

  // GET ALLIES SERVICES REQUESTS
  GetAlliesServicesRequestsByStatus(id:string, status:string, limit:number , offset:number){
    const url = `${this.base_url}/service-request/user/${id}/status/${status}/?limit=${limit}&offset=${offset}`;
    return this.http.get(url, this.header);
  };

  // GET ALLIES FEE SERVICES
  GetAlliesFeeServices(id:string, limit:number, offset:number){
    const url = `${this.base_url}/ally-fee/user/${id}/?limit=${limit}&offset=${offset}`;
    return this.http.get(url, this.header);
  };

  // UPDATE REQUEST SERVICES STATUS
  UpdateAllieServiceRequestResponse(service_id:string, data:{}){
    const url = `${this.base_url}/service-request/${service_id}/response`;
    return this.http.put(url, data, this.header)
  };

  // GET SERVICE REQUEST
  GetServiceRequestID(id:string){
    const url = `${this.base_url}/service-request/${id}/`;
    return this.http.get(url, this.header);
  };


  // ALLY FEE SERVICES

  NewAllyFee(data:{}){
    const url = `${this.base_url}/ally-fee/`;
    return this.http.post(url, data, this.header);
  };

  GetServicesWithoutFee(license:string){
    const url = `${this.base_url}/ally-fee/license/${license}/`;
    return this.http.get(url, this.header);
  }

  // GET ALLIE FILES

  GetAllieFiles(id:string) {
    const url = `${this.base_url}/ally_file/${id}/`;
    return this.http.get(url, this.header);
  };

}

