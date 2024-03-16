import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import Swal from 'sweetalert2'
import 'tw-elements';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  public p_name:string = '';
  public p_description:string = '';
  public max_affiliates:number  = 0;
  public max_extra_affiliates:number = 0;
  public affiliate_fee:number = 0;
  public extra_affiliate_fee:number = 0;
  public Plans:any[] = [];
  public searchTerm:string ='';
  constructor(private configSvc:ConfigService, private router:Router ) { }

  ngOnInit(): void {
    this.getPlans();

  }

  // NEW PLAN METHOD
  NewPlan(){
      const body = {
          name: this.p_name,
          description: this.p_description,
          max_affiliates: this.max_affiliates,
          max_extra_affiliates: this.max_extra_affiliates,
          affiliate_fee: this.affiliate_fee,
          extra_affiliate_fee: this.extra_affiliate_fee,
          is_active: true,

      };
      this.configSvc.newPLan(body)
            .subscribe({
              error:(error:any) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'El formulario se encuentra incompleto!',
                });
              },
              next:(resp:any) => {
                Swal.fire(
                  'Exito!',
                  'Información guardada correctamente',
                  'success'
                );
                this.router.navigateByUrl(`/Dashboard/config/EditPlans/${resp.id}/edit`)
              }
            });
  };

  // DUPLICATE PLAN METHOD
  DuplicatePlan(id:string){
    const body = {
      plan:id
    };

    this.configSvc.DuplicatePlan(body)
            .subscribe({
              error:(error:any) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'No se ha duplicado el plan, vuelve a intentarlo!',
                  footer: '<a Revisa los campos</a>'
                });
              },
              next:(resp:any) => {
                Swal.fire(
                  'Exito!',
                  'Se ha duplicado el plan correctamente',
                  'success'
                );
                this.router.navigateByUrl(`/Dashboard/config/EditPlans/${resp.plan_id}/edit`);
              }
            })
  };

  // GET PLANS METHOD
  getPlans(){
    this.configSvc.GetPlans(this.searchTerm)
          .subscribe({
            error:(error:any) => {
              console.log(error);
            },
            next:(resp:any) => {
              this.Plans = resp.results;
            }
          });
  };

  // BLOCK PLAN METHOD
  BlockPLan(p_id:string) {
    const body = {
      is_active:false
    }
    Swal.fire({
      title: '¿Estas seguro de inhabilitar este plan?',
      text: "No podrás  deshacer este cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deshabilitar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.configSvc.EditPlan(p_id, body)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            Swal.fire('Oooops', 'No pudimos inhabilitar este plan', 'error');
          },
          next:(resp:any) => {
            Swal.fire('Exito!', 'Plan Deshabilitado', 'success');
            this.getPlans();
          }
        });
      };
    });


  };

  // UNBLOCK PLAN MEHTOD
  UnBlockPLan(p_id:string) {
    const body = {
      is_active:true
    }
    Swal.fire({
      title: '¿Estas seguro de habilitar este plan?',
      text: "luego tienes la posibilidad de revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, habilitar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.configSvc.EditPlan(p_id, body)
        .subscribe({
          error:(err:any) => {
            Swal.fire('Oooops', 'No pudimos habilitar este plan', 'error');
          },
          next:(resp:any) => {
            Swal.fire('Exito!', 'Plan habilitado', 'success');
            this.getPlans();
          }
        });
      };
    });


  };

  // DELETE PLAN METHOD
  DeletePlan(p_id:string){
  Swal.fire({
    title: '¿Estas seguro de eliminar este plan?',
    text: "luego tienes la posibilidad de revertirlo!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!'
  }).then((result) => {
      if (result.isConfirmed) {
        this.configSvc.DeletePlan(p_id).subscribe({
          error:(err:any) =>  {
            console.log(err);
            Swal.fire('Oooops', 'No pudimos eliminar este plan', 'error');
          },
          next:(resp:any) => {
            console.log(resp);
            Swal.fire('Exito!','Plan eliminado correctamente', 'success');
            this.getPlans();
          }
        })
      };
    });
  }
}
