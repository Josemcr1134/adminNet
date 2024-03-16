import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-services',
  templateUrl: './edit-services.component.html',
  styleUrls: ['./edit-services.component.css']
})
export class EditServicesComponent implements OnInit {
  public Specialties:any[] = [];
  public sid:string = '';
  public s_name:string ='';
  public s_desc:string = '';
  public s_fee:any = 0;
  public p_id:string = '';
  public s_is_active:boolean = true;
  public image:File|any;
  public is_active:any = true;
  constructor( private activatedRoute:ActivatedRoute, private configSvc:ConfigService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.sid = id;
    });
    this.GetMedicalServiceByID();
    this.GetPlans();
  }

  GetMedicalServiceByID(){
    this.configSvc.GetGeneralService(this.sid)
          .subscribe({
            error:(error:any) => {
              console.log(error);
            },
            next:(resp:any) => {
              console.log(resp);
              this.s_name = resp.name;
              this.s_desc = resp.description;
              this.s_fee = resp.fee;

              this.s_is_active = resp.is_active;
              this.p_id = resp.plan;
            }
          })
  }


  EditMedicalService(){
    const fd = new FormData();
    fd.append('name', this.s_name);
    fd.append('description', this.s_desc);
    fd.append('fee', this.s_fee);
    fd.append('plan', this.p_id);
    fd.append('is_active', this.is_active);
   
 
    this.configSvc.EditGeneralService(this.sid, fd)
            .subscribe({
              error:(error:any) => {
                Swal.fire('Oooops', 'Vuelve a intentarlo', 'error')

              },
              next:(resp:any) => {
                Swal.fire('Exito', 'Servicio actualizado', 'success');
                this.router.navigateByUrl('/Dashboard/config/Services')
              }

            })
  }
  GetPlans(){
    this.configSvc.GetPlans()
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => { 
              this.Specialties = resp.results;
              console.log(resp);
            }
          })
  };
  // On file Select 
  onChangeImages(event:any) {
    this.image = event.target.files[0];
  }
}
