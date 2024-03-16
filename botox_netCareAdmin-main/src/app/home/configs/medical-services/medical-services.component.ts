import { Component, OnInit } from '@angular/core';

import { MedicalsServicesService } from 'src/app/services/medical-services.service';
import Swal from 'sweetalert2';
import { ConfigService } from '../../../services/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medical-services',
  templateUrl: './medical-services.component.html',
  styleUrls: ['./medical-services.component.css']
})
export class MedicalServicesComponent implements OnInit {
  public medicalServices:any[] = [];
  public service_title:string = '';
  public service_description:string = '';
  public loading:boolean = false;

  public m_fee:any = 0;
  public specialtie:string = '';
  public Specialties:any[] = [];

  public limit:number = 10 ;
  public offset:number = 0;
  public page:number = 1
  public next:any;
  public previous:any;
  public count:any;

  public image:File|any;
  public is_active:any = true;
  public cups_code:string = '';
  public service_type:string = '';
  public serviceTypes:any[] = [];
  public specialtyOffset:number = 0;
  public specialtyLimit:number = 1000;
  public searchTerm:string ='';
  constructor(private medicalSvc:MedicalsServicesService, public configSvc:ConfigService, private router:Router) { }

  ngOnInit(): void {
    this.GetMedicalServices();
    this.GetSpecialties();
    this.GetServicesType();
  }

  GetMedicalServices(){
    this.medicalSvc.GetMedicalServices(this.limit, this.offset, this.searchTerm)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.medicalServices = resp.results;
                  this.next = resp.next;
                  this.previous = resp.previous;
                  this.count = resp.count;
                }
              })
  }


  Pagination(value:number){
    this.page += value;

    if(this.page > 0){
      this.offset = (this.limit * this.page) -  this.limit;
    } else if(this.page <  1){
      this.page === 1;
    } else if(this.medicalServices.length === 0){
      this.offset = (this.limit * (this.page - 1)) -  this.limit;
    }
    this.GetMedicalServices();
  };

  NewMedicalService(){
    const fd = new FormData();
    fd.append('name', this.service_title);
    fd.append('description', this.service_description);
    fd.append('fee', this.m_fee);
    fd.append('cups', this.cups_code);
    fd.append('specialty', this.specialtie);
    fd.append('is_active', this.is_active);
    fd.append('image', this.image);
    fd.append('service_type', this.service_type )

    this.medicalSvc.NewMedicalService(fd)
            .subscribe({
              error:(err:any) => {
                console.log(err);
                Swal.fire('Oooops', 'No pudimos crear este servicio médico, no se pudo crear el servicio correctamente, revise que todos los campos esten diligenciados');
              },
              next:(resp:any) => {
                this.GetMedicalServices();
                Swal.fire('Éxito', 'Servicio médico creado correctamente', 'success');
                this.router.navigateByUrl(`/Dashboard/config/MedicalService/${resp.id}`)
              }
            })
  };

  DeleteMedicalService(id:string){
        Swal.fire({
          title: '¿Vas a eliminar este registro?',
          text: "No podrás revertir  este cambio!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.medicalSvc.DeleteMedicalService(id)
                  .subscribe({
                    error:(err:any) => {
                      console.log(err);
                      Swal.fire('Oooops', 'No pudimos eliminar este registro');
                    },
                    next:(resp:any) => {
                      this.GetMedicalServices();
                      Swal.fire('Éxito', 'Servicio  eliminada', 'success');
                    }
                  })
          }
        })
  };

  DisableMedicalService(id:string){
    const body = {
      is_active:false
    }
    Swal.fire({
      title: '¿Vas a deshabilitar este registro?',
      text: "No podrás revertir  este cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deshabilitar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicalSvc.UpdateMedicalService(body, id)
          .subscribe({
            error:(err:any) => {
              console.log(err);
              Swal.fire('Oooops', 'No pudimos deshabilitar este servicio', 'warning');
            },
            next:(resp:any) => {
              Swal.fire('Éxito','Servicio deshabilitado', 'success');
              this.GetMedicalServices();
            }
          });
      };
    });
  };

  EnableMedicalService(id:string){
    const body = {
      is_active:true
    }
    Swal.fire({
      title: '¿Vas a habilitar este registro?',
      text: "No podrás revertir  este cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, habilitar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicalSvc.UpdateMedicalService(body, id)
          .subscribe({
            error:(err:any) => {
              console.log(err);
              Swal.fire('Oooops', 'No pudimos habilitar este servicio', 'warning');
            },
            next:(resp:any) => {
              Swal.fire('Éxito','Servicio habilitado', 'success');
              this.GetMedicalServices();
            }
          });
      };
    });
  };

  GetSpecialties(){
    this.configSvc.GetAllMedicalSpecialties(this.offset, this.specialtyLimit)
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              this.Specialties = resp.results;
            }
          })
  };

  // On file Select
  onChangeImages(event:any) {
    this.image = event.target.files[0];
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
