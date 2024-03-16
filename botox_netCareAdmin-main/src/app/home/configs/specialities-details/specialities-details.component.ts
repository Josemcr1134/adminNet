import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { MedicalsServicesService } from 'src/app/services/medical-services.service';
import Swal from 'sweetalert2';
import { VademecumService } from '../../../services/vademecum.service';


@Component({
  selector: 'app-specialities-details',
  templateUrl: './specialities-details.component.html',
  styleUrls: ['./specialities-details.component.css']
})
export class SpecialitiesDetailsComponent implements OnInit {
  public sid:string = '';
  public specialtyName:string = '';
  public services:any [] = [];
  public vademecum:any [] = [];
  public medicines:any[] = [];
  public medicalServices:any[] = [];
  public service_id:string = '';
  public suggested_fee:number = 0;
  public newService:boolean = false;
  public newVademecum:boolean = false;
  public service_title:string = '';
  public service_description:string = '';
  public loading:boolean = false;
  public chemical_substance:string = '';
  public tradename:string = '';
  public dossage_form:string = '';
  public volume:number = 0;
  public unit:string = '';
  public appearance:string = '';
  public medicine_id:string = '';


  public limit:number = 10 ;
  public offset:number = 0;
  public next:any;
  public previous:any;
  public page:number = 1;
  public pageMedicine:number = 1;
  public count:number = 0
  public offsetMedicine:number = 0;
  public limitMedicine:number = 10;
  constructor( private activatedRoute:ActivatedRoute, private configSvc:ConfigService, private medicalServicesSvc:MedicalsServicesService, private vademecumSvc:VademecumService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.sid = id;
    });
    this.GetSpecialtyById();
    this.GetMedicines();
  }

  GetSpecialtyById(){
    this.configSvc.GetMedicalSpecialtieById(this.sid)
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              this.services = resp.services_by_specialty;
              this.vademecum = resp.vademecum_by_specialty;
              this.specialtyName = resp.name;
            }
          })
  };

  GetMedicines(){
    this.vademecumSvc.GetMedicines(this.limitMedicine, this.offsetMedicine)
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              this.medicines = resp.results;
            }
          });
  };

  PaginationMedicines(value:number){
    this.pageMedicine += value;

    if(this.pageMedicine > 0){
      this.offsetMedicine = (this.limit * this.pageMedicine) -  this.limit;
    } else if(this.pageMedicine <  1){
      this.pageMedicine === 1;
    } else if(this.vademecum.length === 0){
      this.offsetMedicine = (this.limit * (this.pageMedicine - 1)) -  this.limit;
    }
    this.GetMedicines();
  };

  AsignMedicineToSpecialtie(){
    const body  = {
      specialty: this.sid,
      medicine: this.medicine_id,
      is_active: true
    };
    this.vademecumSvc.AssignMedicineToSpecialtie(body)
          .subscribe({
            error:(err:any) => {
              this.loading = !this.loading;
              Swal.fire('Oooops', 'No pudimos asignar este medicamento', 'error');
            },
            next:(resp:any) => {
              this.loading = !this.loading;
              this.GetSpecialtyById();
              Swal.fire('Éxito', 'Medicamento asignado', 'success');
              this.newVademecum = !this.newVademecum;
            }
          });
  };

  DeleteVademecumAssignation(id:string){
    Swal.fire({
      title: '¿Quieres eliminar esta asignación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vademecumSvc.DeleteVademecum(id)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            Swal.fire('Oooops','No pudimos desasignar este medicamento', 'warning');
            this.GetSpecialtyById();
          },
          next:(resp:any) => {
            this.GetSpecialtyById();
            Swal.fire('Éxito','Medicamento desasignado', 'success')
          }
        })
      }
    })

  }



  ShowNewVademecumModal(){
    this.newVademecum = !this.newVademecum;
  };



}
