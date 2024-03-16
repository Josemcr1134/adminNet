import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VademecumService } from '../../../services/vademecum.service';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {
  public vademecum:any [] = [];
  public loading:boolean = false;
  public tradename:string = '';
  public dossage_form:string = '';
  public volume:number = 0;
  public unit:string = '';
  public appearance:string = '';
  public pharmacological_group:string = '';
  public pharmaceutical_form:string = '';
  public drug_subgroup:string = '';
  public concentration:string = '';
  public organ_system:string = '';
  public coverage:string = '';
  public invima:string = '';
  public indications:string = '';
  public diagnostics:string = '';
  public active_code:string = '';
  public code:string = '';
  public concentration_code:string = '';
  public offset:number = 0;
  public page:number = 1;
  public limit:number = 10;
  public Units:any[] = [];
  public ActivesCodes:any[] = [];
  public PharmaceuticalForms:any[] = [];
  public searchTerm:string ='';
  constructor(private vademecumSvc:VademecumService, private router:Router) { }

  ngOnInit(): void {
    this.GetVademecum();
    this.GetActivesCode();
    this.GetPharmaceuticalForms();
    this.GetUnits();
  }

  GetVademecum(){
      this.vademecumSvc.GetMedicines(this.limit, this.offset, this.searchTerm)
            .subscribe({
              error:(err:any) =>  {
                console.log(err);
              },
              next:(resp:any) => {
                this.vademecum = resp.results;
              }
            })
  };

  PaginationMedicines(value:number){
    this.page += value;

    if(this.page > 0){
      this.offset = (this.limit * this.page) -  this.limit;
    } else if(this.page <  1){
      this.page === 1;
    } else if(this.vademecum.length === 0){
      this.offset = (this.limit * (this.page - 1)) -  this.limit;
    }
    this.GetVademecum();
  };


  NewVademecum(){
    this.loading = !this.loading;
    const body  = {
      trade_name: this.tradename,
      pharmaceutical_form:this.pharmaceutical_form,
      pharmacological_group: this.pharmacological_group,
      drug_subgroup:this.drug_subgroup,
      volume: this.volume,
      unit: this.unit,
      appearance: this.appearance,
      concentration: this.concentration,
      organ_system: this.organ_system,
      coverage: this.coverage,
      invima: this.invima,
      indications: this.indications,
      diagnostics: this.diagnostics,
      active_code: this.active_code,
      code: this.code,
      concentration_code: this.concentration_code,
      dosage_form: this.dossage_form,
    };
    this.vademecumSvc.NewMedicine(body)
      .subscribe({
        error:(err:any) => {
          console.log(err)
          Swal.fire('Oooops', 'No se pudo crear el medicamento correctamente, revise que todos   los campos esten diligenciados', 'error');
          this.loading = this.loading;
        },
        next:(resp:any) =>  {
          Swal.fire('Éxito', 'Medicamento creado correctamente', 'success');
          this.router.navigateByUrl(`/Dashboard/config/Medicine/${resp.id}`);

        }
      })
  };

  DeleteVademecum(id:string){
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
        this.vademecumSvc.DeleteMedicine(id)
              .subscribe({
                error:(err:any) => {
                  Swal.fire('Oooops', 'No pudimos eliminar este registro');
                },
                next:(resp:any) => {
                  this.GetVademecum();
                  Swal.fire('Éxito', 'Medicina eliminada', 'success');
                }
              })
      }
    })
  };

  GetActivesCode(){
    this.vademecumSvc.GetActivesCodes()
              .subscribe({
                error:(err:any)=> {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.ActivesCodes = resp.results;
                }
              });
  };

  GetPharmaceuticalForms(){
    this.vademecumSvc.GetPharmaceuticalForm()
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.PharmaceuticalForms = resp.results;

                }
              });
  };

  GetUnits(){
    this.vademecumSvc.GetUnits()
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                this.Units = resp.results;

              }
            });
  };
}
