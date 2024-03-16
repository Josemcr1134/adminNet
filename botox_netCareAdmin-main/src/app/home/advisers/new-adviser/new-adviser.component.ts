import { Component, OnInit } from '@angular/core';
import { AdvisersService } from '../../../services/advisers.service';
import { Router } from '@angular/router';
import { GLobalService } from '../../../services/global.service';
import Swal from 'sweetalert2';
import { RegisterService } from '../../../services/register.service';

@Component({
  selector: 'app-new-adviser',
  templateUrl: './new-adviser.component.html',
  styleUrls: ['./new-adviser.component.css']
})
export class NewAdviserComponent implements OnInit {
  public ID_type:string =  '';
  public email:string = '';
  public first_name:string = '';
  public last_name:string = '';
  public surnames:string = '';
  public phone_number:string = '';
  public document_type_id:string = '';
  public document:string = '';
  public gender:string = '';
  public documentTypes:any[] = [];
  public genders:any[] = [];
  public charge:boolean = false;
  public individual_plan_goal:number = 0;
  public family_plan_goal:number = 0;
  public emailStatus:boolean = true;
  public Countries:any[] = [];
  public Dpts:any [] = [];
  public Municipalities:any[] = [];
  public Neighborhoods:any[] = [];
  public country:string = '';
  public dpt:string = '';
  public municipality:string = '';
  public neighborhood:string = '';
  public address:string = '';
  public address_detail:string  = '';
  public limit:number = 1000;
  public offset:number = 0;
  constructor(private registerSvc:RegisterService,private globalSvc:GLobalService ,private router:Router) { }

  ngOnInit(): void {
    this.GetDocumentTypes();
    this.GetGenders();
    this.GetCountries();

  }

  //NEW ADVISER METHOD
  NewAdviser(){
    this.charge = !this.charge;
    const body = {
        username: this.surnames,
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        gender:this.gender,
        document_type: this.document_type_id,
        document: this.document,
        phone_number: this.phone_number,
        enable_code:'xxxx',
        address:[
          {
           name: this.address,
           address_detail:this.address_detail,
           neighborhood: this.neighborhood
         },

        ]
    }

    this.registerSvc.NewAdviser(body)
          .subscribe({
            error:(err:any) => {
               Swal.fire('Ooops', 'No se ha podido realizar el registro, revise que todos los campos se encuentren diligenciados', 'error');
              this.charge = !this.charge;
            },
            next:(resp:any) => {

              Swal.fire('Exito', 'El asesor ha sido creado correctamente', 'success');
              this.router.navigateByUrl('/Dashboard/advisers/listAdviser');
              this.charge = !this.charge;

            }
          });
  };

  // DOCUMENT TYPES
  GetDocumentTypes(){
    this.globalSvc.GetDocumentTypes()
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.documentTypes = resp.results;
                }
              });
  };

  // GENDERS
  GetGenders(){
    this.globalSvc.GetGenders()
    .subscribe({
      error:(err:any) => {
        console.log(err);
      },
      next:(resp:any) => {
        this.genders = resp.results;
      }
    });
  };


  // VALIDATE EMAIL
  validateEmail() {
    return this.emailStatus = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.email);
  };

  GetCountries(){
    this.globalSvc.GetCountries()
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                this.Countries = resp.results;
              }
            })
  };

  GetDpt(country:string){
    this.globalSvc.GetDepartments(country)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.Dpts = resp.results;
                }
              });
  };

  GetMunicipality(dpt:string){
      this.globalSvc.GetMunicipality(dpt)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.Municipalities = resp.results;
                }
              });
  };

  GetNeighborhood(municipality:string){
      this.globalSvc.GetNeighborhood(municipality, this.limit, this.offset)
                .subscribe({
                  error:(err:any) => {
                    console.log(err);
                  },
                  next:(resp:any) => {
                      this.Neighborhoods = resp.results;
                  }
                });
  };

}
