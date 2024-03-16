import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialistService } from '../../../services/specialist.service';
import Swal from 'sweetalert2';


interface comment { 
  text:string
};

@Component({
  selector: 'app-aprove-decline-allies-services',
  templateUrl: './aprove-decline-allies-services.component.html',
  styleUrls: ['./aprove-decline-allies-services.component.css']
})
export class AproveDeclineAlliesServicesComponent implements OnInit {

  public ID:any = '';
  public f_type:string = '';
  public service_name:string = '';
  public service_fee:string = '';
  public service_desc:string = '';
  public service_comments:any [] = [];
  public service_prev_data:any[] = [];
  public image:string = '';
  public allie_id:any;
  public new_comment:string  = '';
  public Licences:any[] = [];
  public Comments:comment[] = [ 
    {
      text:this.new_comment
    }
  ];
  public prev_data:any [] = [];
  public netcare_fee:number = 0;
  public external_netcare_fee:number = 0;
  public specialt_selected:string = '';
  public service_specialty:string = '';
  constructor( private activatedRoute:ActivatedRoute, private specialistSvc:SpecialistService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id,  action}) => {
      this.ID = id;
      this.f_type = action;
    });

    console.log(this.ID, this.f_type)
    this.GetRequestServiceByID();
    
  }

  GetRequestServiceByID(){
    this.specialistSvc.GetServiceRequestID(this.ID)
              .subscribe({
                error:(err:any) => { 
                  console.log(err);
                },
                next:(resp:any) => { 
                  console.log(resp);
                  this.service_name = resp.name;
                  this.service_desc = resp.description;
                  this.service_fee = resp.fee;
                  this.image = resp.image;
                  this.service_comments = resp.comments;
                  this.allie_id = resp.ally;
                  this.external_netcare_fee = resp.external_fee;
                  this.prev_data = resp.prev_data;
                  this.service_specialty = resp.specialty;
                  this.netcare_fee = resp.netcare_fee || 0;
                  if (this.Licences.length === 0) {
                    this.GetAllieLicense();
                  } 
                }
              })
  };

  CorrectService(){
    const body =  {
      status: 'evaluated' , 
      comment:this.new_comment ,
      netcare_fee:this.netcare_fee 

    };
    Swal.fire({
      title: 'Quieres corregir este servicio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, corregir!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.specialistSvc.UpdateAllieServiceRequestResponse(this.ID, body)
        .subscribe({
          error:(err:any) => { 
            console.log(err, body);
            Swal.fire('Ooooops', 'No pudimos corregir este servicio', 'error');
          }, 
          next:(resp:any) => { 
            console.log(resp);
            Swal.fire('Éxito', 'Servicio corregido', 'success');
            this.router.navigateByUrl(`/Dashboard/allies/AlliesList`)
          }
        });
      };
    });
   
  }

  AproveService(){
   
    const body =  {
      status: 'passed' , 
      comment:this.new_comment,
      netcare_fee:this.netcare_fee 
    };
    Swal.fire({
      title: 'Quieres aprobar este servicio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, aprobar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.specialistSvc.UpdateAllieServiceRequestResponse(this.ID, body)
        .subscribe({
          error:(err:any) => { 
            console.log(err, body);
            Swal.fire('Ooooops', 'No pudimos aprobar este servicio', 'error');
          }, 
          next:(resp:any) => { 
            console.log(resp);
            Swal.fire('Éxito', 'Servicio aprobado', 'success');
            this.router.navigateByUrl(`/Dashboard/allies/AlliesList`)
          }
        });
      };
    });
  };

  DeclineService(){
    const body =  {
      status: 'refused' , 
      comment:this.new_comment,
      netcare_fee:this.netcare_fee 
    };
  
    Swal.fire({
      title: 'Quieres rechazar este servicio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, rechazar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.specialistSvc.UpdateAllieServiceRequestResponse(this.ID, body)
        .subscribe({
          error:(err:any) => { 
            console.log(err, body);
            Swal.fire('Ooooops', 'No pudimos rechazar este servicio', 'error');
          }, 
          next:(resp:any) => { 
            console.log(resp);
            Swal.fire('Éxito', 'Servicio rechazado', 'success');
            this.router.navigateByUrl(`/Dashboard/allies/AlliesList`)
          }
        });
      };
    });
  };
  GetAllieLicense(){
    this.specialistSvc.GetAlliesLicences(this.allie_id)
          .subscribe({
            error:(err:any) => { 
              console.log(err);
            }, 
            next:(resp:any) => {
              console.log(resp) 
              this.Licences = resp.results;
              this.GetRequestServiceByID();
            }
          });
  };

}
