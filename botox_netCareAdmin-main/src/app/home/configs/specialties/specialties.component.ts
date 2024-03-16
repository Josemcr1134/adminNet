import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.css']
})
export class SpecialtiesComponent implements OnInit {
  public Specialties:any [] = [];
  public specialtie_name:string = "";
  public vademecum:File| any ;
  public image:File | any ;
  public description:string = '';
  public is_active:any = true;
  public page:number = 1;
  public offset:number = 0;
  public limit:number = 15;
  public previous:any;
  public next:any;
  public count:number = 0;
  public searchTerm:string ='';
  constructor(private configSvc:ConfigService, private router:Router) { }

  ngOnInit(): void {
    this.GetSpecialties();

  }

  NewSpecialties(){
    const fd = new FormData();
    fd.append('name', this.specialtie_name);
    fd.append('description', this.vademecum);
    fd.append('image', this.image);
    fd.append('is_active', this.is_active);
    this.configSvc.NewMedicalSpecialtie(fd)
          .subscribe({
            error:(err:any) => {
              console.log(err);
              Swal.fire('Oooops', 'No se pudo crear la especialidad correctamente, revise que todos  los campos esten diligenciados', 'error');
            },
            next:(resp:any) => {
              Swal.fire('Exito', 'Especialidad creada correctamente', 'success');
              this.router.navigateByUrl(`/Dashboard/config/SpecialtyDetails/${resp.id}`)
              this.GetSpecialties();
            }
          })
  }

  GetSpecialties(){
    this.configSvc.GetAllMedicalSpecialties(this.offset,this.limit, this.searchTerm)
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            this.Specialties = resp.results;
            this.count = resp.count;
            this.previous = resp.previous;
            this.next = resp.next;
          }
        });
  };
  Pagination(value:number){
    this.page += value;

    if(this.page > 0){
      this.offset = (this.limit * this.page) -  this.limit;
    } else if(this.page <  1){
      this.page === 1;
    } else if(this.vademecum.length === 0){
      this.offset = (this.limit * (this.page - 1)) -  this.limit;
    }
    this.GetSpecialties();
  };

  DeleteSpecialties(id:string){
    Swal.fire({
      title: '¿Estas seguro de eliminar esta especialidad?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.configSvc.DeleteMedicalSpecialtie(id)
        .subscribe({
          error:(err:any) => {
            Swal.fire('Oooops', 'No pudimos eliminar esta especialidad', 'error');
          },
          next:(resp:any) => {
            Swal.fire('Exito!', 'Especialidad eliminada', 'success');
            this.GetSpecialties();
          }
        });
      };
    });

  }

  DisableSpecialtie(id:string, is_active:boolean){
    const body = {
      services_update:{
        is_active: !is_active
      }
    }

    Swal.fire({
      title: '¿Estas seguro de deshabilitar esta especialidad?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deshabilitar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.configSvc.UpdateMedicalSpecialtie(id, body)
        .subscribe({
          error:(err:any) => {
            Swal.fire('Oooops', 'No pudimos realizar esta acción, vuelve a intentarlo', 'error');
          },
          next:(resp:any) => {
            Swal.fire('Exito!', 'Se realizó correctamente el cambio', 'success');
            this.GetSpecialties();
          }
        })

      };
    });

  }

  // On file Select - Vademecum
  onChangeVademecum(event:any) {
    this.vademecum = event.target.files[0];
  }
  // On file Select - Services
  onChangeImages(event:any) {
    this.image = event.target.files[0];
  }
}
