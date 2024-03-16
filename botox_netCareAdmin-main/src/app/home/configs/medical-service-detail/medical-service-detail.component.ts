import { Component, OnInit } from '@angular/core';
import { ActivationEnd, ActivatedRoute, Router } from '@angular/router';
import { MedicalsServicesService } from '../../../services/medical-services.service';
import Swal from 'sweetalert2';
import { ConfigService } from '../../../services/config.service';

@Component({
  selector: 'app-medical-service-detail',
  templateUrl: './medical-service-detail.component.html',
  styleUrls: ['./medical-service-detail.component.css']
})
export class MedicalServiceDetailComponent implements OnInit {
  public service_title:string = '';
  public service_description:string = '';
  public loading:boolean = false;
  public sid:string ='';
  public m_fee:number = 0;
  public specialtie:string = '';
  public Specialties:any[] = [];
  public limit:number = 10000;
  public offset:number = 0;
  public service_type:string = '';
  public serviceTypes:any[] = [];
  constructor(private medicalSvc:MedicalsServicesService, private activatedRoute:ActivatedRoute, private router:Router, private configSvc:ConfigService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.sid = id;
    });
    this.GetMedicalServiceByID();
    this.GetSpecialties();
    this.GetServicesType();
  }

  GetMedicalServiceByID(){
    this.medicalSvc.GetMedicalServicesByID(this.sid)
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
               this.service_title = resp.name;
              this.service_description = resp.description;
              this.m_fee = resp.fee;
              this.specialtie = resp.specialty;
              this.service_type = resp.service_type;

            }
          })
  };
  UpdateMedicalService(){
    const body = {
      name: this.service_title,
      description: this.service_description,
      specialty:this.specialtie,
      service_type:this.service_type
    };

    this.medicalSvc.UpdateMedicalService(body, this.sid).subscribe({
      error:(err:any) => {
        Swal.fire('Oooops','No pudimos actualizar este servicio', 'error');
      },
      next:(resp:any) => {
        Swal.fire('Éxito', 'Servicio actualizado', 'success');
        this.router.navigateByUrl('/Dashboard/config/MedicalService')
      }
    })
  };
  GetSpecialties(){
    this.configSvc.GetAllMedicalSpecialties(this.offset, this.limit)
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              this.Specialties = resp.results;
            }
          });
  };

  GetServicesType(){
    this.medicalSvc.GetServiceTypes()
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                this.serviceTypes = resp.results;
              }
            });
  };
}
