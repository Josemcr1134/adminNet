import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VademecumService } from '../../../services/vademecum.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.css']
})
export class MedicineDetailsComponent implements OnInit {
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
  public id:string = '';
  public Units:any[] = []; 
  public ActivesCodes:any[] = []; 
  public PharmaceuticalForms:any[] = []; 
  constructor( private activatedRoute:ActivatedRoute, private vademecumSvc:VademecumService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.id = id;
    });
    this.GetVademecumByID();
  }

  GetVademecumByID(){
    this.vademecumSvc.GetMedicine(this.id)
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              this.tradename = resp.trade_name;
              this.pharmaceutical_form = resp.pharmaceutical_form;
              this.pharmacological_group = resp.pharmacological_group;
              this.pharmaceutical_form = resp.pharmaceutical_form;
              this.drug_subgroup = resp.drug_subgroup;
              this.volume = resp.volume;
              this.unit = resp.unit;
              this.appearance = resp.appearance;
              this.concentration = resp.concentration;
              this.organ_system = resp.organ_system;
              this.coverage = resp.coverage;
              this.invima = resp.invima;
              this.indications = resp.indications;
              this.diagnostics = resp.diagnostics;
              this.active_code = resp.active_code;
              this.code = resp.code;
              this.concentration_code = resp.concentration_code;
              this.dossage_form = resp.dosage_form;
            }
          });
  };
  UpdateVademecum(){
    const body = {
      tradename: this.tradename,
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

    this.vademecumSvc.EditMedicine(body, this.id)
          .subscribe({
            error:(err:any) => {
              console.log(err)
              Swal.fire('Oooops', err.error.detail || err.error.volume[0], 'error');
            },
            next:(resp:any) => {
              Swal.fire('Éxito', 'Medicamento actualizado', 'success');
              this.router.navigateByUrl('/Dashboard/config/Medicine');
            }
          });
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
