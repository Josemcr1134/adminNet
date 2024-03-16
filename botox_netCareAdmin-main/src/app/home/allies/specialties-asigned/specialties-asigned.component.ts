import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpecialistService } from '../../../services/specialist.service';
import { ConfigService } from '../../../services/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-specialties-asigned',
  templateUrl: './specialties-asigned.component.html',
  styleUrls: ['./specialties-asigned.component.css']
})
export class SpecialtiesAsignedComponent implements OnInit {
  public id:number = 0;
  public assignmentID:string = '';
  public specialtyID:string = '';
  public Specialties:any[] = [];
  public Licences:any[] = [];
  public userType:string = '';
  public hideShowNewLicenseModal:boolean = false;
  public ally_name:string = '';
  public offset:number = 0;
  public limit: number = 1000;
  constructor(private specialistSvc:SpecialistService,private configSvc:ConfigService ,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id, type}) => {
      this.id = id;
      this.userType = type;
    });

    this.GetSpecialties();
    this.GetAllieLicense();
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

  NewLicenseSpecialtie(){
    const body = {
      specialty: this.specialtyID,
      parent_owner: this.id,
      is_active: true
    };
    this.specialistSvc.NewLicenseSpecialty(body)
                .subscribe({
                  error:(err:any) => {
                    console.log(err);
                    Swal.fire('Oooops', 'No pudimos asignar esta especialidad','error');

                  },
                  next:(resp:any) => {
                    if (this.userType === 'natural') {
                     this.AssignLicenseToMedical(resp.id);
                    } else {
                      this.hideShowNewLicenseModal = !this.hideShowNewLicenseModal;
                      Swal.fire('Éxito', 'Especialidad asignada', 'success');
                      this.GetAllieLicense();
                    }
                  }
                })
  };

  AssignLicenseToMedical(id:string){

    const body = {
      license: id,
      medical: this.id,
      is_active: true
    };

    this.specialistSvc.NewLicenseToMedical(body)
          .subscribe({
            error:(err:any) => {
              console.log(err, body);
              Swal.fire('Oooops', 'No pudimos asignar esta especialidad','error');
            },
            next:(resp:any) => {
              console.log(resp);
              Swal.fire('Éxito', 'Especialidad asignada', 'success');
              this.hideShowNewLicenseModal = !this.hideShowNewLicenseModal;
              this.GetAllieLicense();
            }
          })
  };

  GetAllieLicense(){
    this.specialistSvc.GetAlliesLicences(this.id)
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              console.log(resp)

              this.Licences = resp.results;
            }
          });
  };

  ShowHideModal(){
    this.hideShowNewLicenseModal = !this.hideShowNewLicenseModal;
  };

  DisableEnableLicense(is_active:boolean, id:string){
    const body = {
      is_active:is_active
    };

    Swal.fire({
      title: '¿Estas seguro de actualizar esta licencia?',
      text: "Luego tienes la posibilidad de cambiarlo nuevamente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar!'
    }).then((result) => {
        if (result.isConfirmed) {
          this.specialistSvc.DisableSpecialtyLicense(id, body)
          .subscribe({
            error:(err:any) => {
              Swal.fire('Ooooops', 'No pudimos actualizar esta licencia', 'error');
            },
            next:(resp:any) => {
              Swal.fire('Éxito', 'Licencia actualizada','success');
              this.GetAllieLicense();
            }
          })
        };
      });
  };

  DeleteLicence(id:string){
    Swal.fire({
      title: '¿Estas seguro de eliminar esta licencia?',
      text: "Luego tienes la posibilidad de asignarla nuevamente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
          this.specialistSvc.DeleteSpecialtyLicense(id)
                .subscribe({
                  error:(err:any) => {
                    console.log(err);
                    Swal.fire('Ooooops', 'No pudimos eliminar esta licencia', 'error');
                  },
                  next:(resp:any) => {
                    Swal.fire('Éxito', 'Licencia eliminada','success');
                    this.GetAllieLicense();
                  }
                });
        };
      });
  };

}
