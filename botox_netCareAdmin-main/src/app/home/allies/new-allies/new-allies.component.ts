import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpecialistService } from '../../../services/specialist.service';
import { GLobalService } from '../../../services/global.service';
import { ConfigService } from '../../../services/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-allies',
  templateUrl: './new-allies.component.html',
  styleUrls: ['./new-allies.component.css']
})
export class NewAlliesComponent implements OnInit {
  public ID_type:string =  '';
  public person_type:number = 1;
  public username:string = '';
  public email:string = '';
  public first_name:string = '';
  public last_name:string = '';
  public gender:string = '';
  public document_type:string = '';
  public document:string = '';
  public phone_number:string = '';
  public enable_code:string = '';
  public nit:number = 0;
  public company_name:string ='';
  public specialties_asigned:any[] = [];
  public doc_types:any[] = [];
  public specialties:any[] = [];
  public genders:any[] = [];
  public Countries:any[] = [];
  public Dpts:any [] = [];
  public Municipalities:any[] = [];
  public Neighborhoods:any[] = [];
  public emailStatus:boolean = true;
  public country:string = '';
  public dpt:string = '';
  public municipality:string = '';
  public neighborhood:string = '';
  public address:string = '';
  public address_detail:string  = '';
  public limit:number = 1000;
  public offset:number = 0;
  public PlatformServices:any[] = [];
  public platformService:string = '';
  constructor( private specialistSvc:SpecialistService, private router:Router, private globalSvc:GLobalService, private configSvc:ConfigService) { }

  ngOnInit(): void {
    this.GetDocumentTypes();
    this.GetGenders();
    this.GetCountries();
    this.GetPlatformServices();
  }

  NewSpecialtieForSpecialist(id:string){
    const s =  id
    if (this.specialties_asigned.find(sp => sp === s)) {
      this.specialties_asigned.splice(this.specialties_asigned.indexOf(s), 1);
    } else {
      this.specialties_asigned.push(s);
    };
  };

  NewNaturalSpecialist(){
    const body = {
      username:  this.email ,

      email: this.email,
      first_name: this.first_name,
      last_name:this.last_name ,
      gender: this.gender,
      document_type: this.document_type,
      document: this.document.toString(),
      phone_number:this.phone_number.toString() ,
      enable_code: this.enable_code,
      service_platform: this.platformService,
      address:[
        {
         name: this.address,
         address_detail:this.address_detail,
         neighborhood: this.neighborhood
       },

      ]
    };

    this.specialistSvc.NewNaturalDoctor(body)
          .subscribe({
            error:(err:any) =>  {
              console.log(err)

              if (err.error.user.email[0]) {
                Swal.fire('Oooops', 'Este email ya se encuentra registrado', 'error');
              } else if(err.error.user.phone_number[0]){
                Swal.fire('Oooops', 'Este celular ya se encuentra registrado', 'error');
              } else if(err.error.user.document[0]){
                Swal.fire('Oooops', 'Este número de documento ya se encuentra registrado', 'error');
              } else {
                Swal.fire('Oooops', 'No pudimos completar tu registro, revisa los campos y vuelve a intentarlo', 'error');
              };
            },
            next:(resp:any) =>  {
              console.log(body)
              Swal.fire('Exito!', 'Especialista registrado', 'success');
              this.router.navigateByUrl('/Dashboard/allies/AlliesList');
            },
          });
  };

  NewLegalStaff(){
    const body = {
      username:  this.email,
      email: this.email,
      first_name: this.first_name,
      last_name:this.last_name ,
      gender: this.gender,
      document_type: this.document_type,
      document: this.document.toString(),
      phone_number:this.phone_number.toString() ,
      enable_code: this.enable_code,
      nit: this.nit.toString(),
      company_name: this.company_name,
      service_platform: this.platformService,
      address:[
        {
         name: this.address,
         address_detail:this.address_detail,
         neighborhood: this.neighborhood
       },

      ]
    };
    this.specialistSvc.NewLegalStaff(body)
              .subscribe({
                error:(err:any) =>  {
                  console.log(err)
                  Swal.fire('Oooops','No pudimos registrar este especialista' ,'warning');
                  console.log(body)
                },
                next:(resp:any) =>  {
                  Swal.fire('Exito!', 'Especialista registrado', 'success');
                  this.router.navigateByUrl('/Dashboard/allies/AlliesList');
                },
              });
  };

  GetDocumentTypes(){
    this.globalSvc.GetDocumentTypes()
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                this.doc_types = resp.results;
                console.log(resp)
              }
            });
  };


  GetGenders(){
    this.globalSvc.GetGenders()
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                this.genders = resp.results;
                console.log(this.genders);
              }
            });
  };

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

  GetPlatformServices(){
    this.configSvc.GetPlatformServices()
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.PlatformServices = resp.results;
                }
              });
  };



}
