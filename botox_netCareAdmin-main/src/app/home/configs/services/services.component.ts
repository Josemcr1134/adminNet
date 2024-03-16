import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ConfigService } from '../../../services/config.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  public Plans:any[] = [];
  public General_Services:any[] = [];
  public s_name:string ='';
  public s_desc:string = '';
  public s_fee:number = 0;
  public p_id:string = '';
  public searchTerm:string ='';
  constructor(private configSvc:ConfigService, private router:Router) { }

  ngOnInit(): void {
    this.GetGeneralServices();
    this.GetPlans();
  }
  // dGeneral services list
  GetGeneralServices(){
    this.configSvc.GetGeneralServices(this.searchTerm)
        .subscribe({
          error:(error:any) => {
            console.log(error);
          },
          next:(resp:any) => {
            this.General_Services = resp.results;
          }
        })
  }

  // Plans list
  GetPlans(){
    this.configSvc.GetPlans()
          .subscribe({
            error:(error:any) => {
              console.log(error);
            },
            next:(resp:any) => {
              this.Plans = resp.results;
            }
          })
  }

  // New Service List
  NewService(){
    const body = {
        name: this.s_name,
        description: this.s_desc,
        fee: this.s_fee,
        plan: this.p_id
    };

    this.configSvc.NewGeneralService(body)
            .subscribe({
              error:(error:any) => {
                console.log(error, body)
                Swal.fire('Ooops', 'No se pudo crear el servicio correctamente, revise que todos los campos esten diligenciados', 'error');
              },
              next:(resp:any) => {
               this.GetGeneralServices();
               this.router.navigateByUrl(`/Dashboard/config/EditService/${resp.id}`)
                Swal.fire('Exito!', 'Servicio creado correctamente', 'success')
              }
            })
  }

  // Block dGeneral Service
  BlockGeneralService(s_id:string){
    const body = {
      is_active:false
    }
    Swal.fire({
      title: '¿Estas seguro de inhabilitar este servicio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deshabilitar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.configSvc.EditGeneralService(s_id, body)
        .subscribe({
          error:(err:any) => {
            Swal.fire('Oooops', 'Ocurrio un error, intentalo nuevamente', 'error');
          },
          next:(resp:any) => {
            Swal.fire('Exito', 'Servicio general deshabilitado', 'success');
            this.GetGeneralServices();
          }
        });
      };
    });

  };

  // Unblock dGeneral Service
  UnBlockGeneralService(s_id:string){
    const body = {
      is_active:true
    }
    Swal.fire({
      title: '¿Estas seguro de habilitar este servicio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, habilitar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.configSvc.EditGeneralService(s_id, body)
        .subscribe({
          error:(err:any) => {
            Swal.fire('Oooops', 'Ocurrio un error, intentalo nuevamente', 'error');
          },
          next:(resp:any) => {
            Swal.fire('Exito', 'Servicio general habilitado', 'success');
            this.GetGeneralServices();
          }
        });
      };
    });

  };


  // Delete dGeneral Service
  DeleteGeneralService(ms_id:string){
    Swal.fire({
      title: '¿Estas seguro de eliminar este servicio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
          this.configSvc.DeleteGeneralService(ms_id).subscribe({
        error:(err:any) => {
          Swal.fire('Oooops', 'No pudimos  eliminar este servicio general', 'error');
        },
        next:(resp:any)=> {
          Swal.fire('Éxito', 'Servicio general eliminado correctamente', 'success');
          this.GetGeneralServices();
        }
      });
      };
    });

  }
}
