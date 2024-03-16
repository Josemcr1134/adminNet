import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigService } from '../../../services/config.service';
import Swal from 'sweetalert2';
import { MedicalServiceDetailComponent } from '../medical-service-detail/medical-service-detail.component';
import { MedicalsServicesService } from 'src/app/services/medical-services.service';

@Component({
  selector: 'app-edit-plans',
  templateUrl: './edit-plans.component.html',
  styleUrls: ['./edit-plans.component.css'],
})
export class EditPlansComponent implements OnInit {
  public pid: string = '';
  public p_name: string = '';
  public p_description: string = '';
  public max_affiliates: number = 0;
  public max_extra_affiliates: number = 0;
  public affiliate_fee: number = 0;
  public extra_affiliate_fee: number = 0;
  public service_id:string = '';
  public Services:any[]=[];
  public AssignedServices:any[]=[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private configSvc: ConfigService,
    private router: Router,
    private medicalSvc:MedicalsServicesService
  ) {}

  public offset:number = 0 ;
  public limit: number = 10;
  public page:number = 1;
  public next:any;
  public previous:any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id, issue }) => {
      this.pid = id;
      // this.f_issue = issue;
      console.log(id);
    });
    this.GetPlanById();
    this.GetAssignmentsServices();
    this.GetMedicalServices();
  }


  // GET PLAN BY ID MEHTOD
  GetPlanById() {
    this.configSvc.GetPlan(this.pid).subscribe({
      error: (error: any) => {
        console.log(error);
      },
      next: (resp: any) => {
        this.p_name = resp.name;
        this.p_description = resp.description;
        this.max_affiliates = resp.max_affiliates;
        this.affiliate_fee = resp.affiliate_fee;
        this.max_extra_affiliates = resp.max_extra_affiliates;
        this.extra_affiliate_fee = resp.extra_affiliate_fee;
      },
    });
  };

  // EDIT PLAN MEHTOD
  EditPlan() {
    const body = {
      name: this.p_name,
      description: this.p_description,
      max_affiliates: this.max_affiliates,
      max_extra_affiliates: this.max_extra_affiliates,
      affiliate_fee: this.affiliate_fee,
      extra_affiliate_fee: this.extra_affiliate_fee,
    };

    this.configSvc.EditPlan(this.pid, body).subscribe({
      error: (error: any) => {
        Swal.fire('Ooops', 'El formulario se encuentra incompleto', 'error');
      },
      next: (resp: any) => {
        Swal.fire('Exito', 'Información guardada correctamente', 'success');
        this.router.navigateByUrl('/Dashboard/config/Plans');
      },
    });
  };

  // GET ASIGNED SERVICES TO PLAN
  GetAssignmentsServices(){
    this.configSvc.GetServicesAssignedToPlan(this.pid)
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                this.AssignedServices = resp.services;
                console.log(this.AssignedServices);
              }
            });
  };

  // ASSIGN SERVICE TO PLAN
  AssignServiceToPlan(){
    const body = {
      plan:this.pid,
      service:this.service_id
    };

    this.configSvc.AssignServiceToPlan(body)
          .subscribe({
            error:(err:any) => {
              Swal.fire('Oooops', 'No pudimos asignar este servicio, vuelve a intentarlo','error');
              console.log(err);
            },
            next:(resp:any) => {
              Swal.fire('Éxito', 'Servicio asignado', 'success');
              this.service_id = '';
              this.GetAssignmentsServices();
            }
          })
  };


  // GET MEDICAL SERVICES

  GetMedicalServices(){
    this.medicalSvc.GetMedicalServices(this.limit, this.offset)
          .subscribe({
            error:(err:any) => console.log(err),
            next:(resp:any) => {
              this.Services = resp.results;
            }
          })
  }

 // DELETE SERVICE ASSIGNED
 DeleteAssignment(as_id:string){
  Swal.fire({
    title: '¿Estas seguro de eliminar esta asignación?',
    text: "luego tienes la posibilidad de asignarlo nuevamente!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!'
  }).then((result) => {
      if (result.isConfirmed) {
        this.configSvc.DeleteAssignmentServiceToPlan(as_id).subscribe({
          error:(err:any) =>  {
            console.log(err);
            Swal.fire('Oooops', 'No pudimos eliminar esta asignación', 'error');
          },
          next:(resp:any) => {
            console.log(resp);
            Swal.fire('Exito!','Asignación eliminada correctamente', 'success');
            this.GetAssignmentsServices();
          }
        })
      };
    });
  }
}
