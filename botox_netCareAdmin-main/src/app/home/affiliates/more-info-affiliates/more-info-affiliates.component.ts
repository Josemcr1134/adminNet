import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AffiliatesService } from '../../../services/affiliates.service';
import { GLobalService } from '../../../services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-more-info-affiliates',
  templateUrl: './more-info-affiliates.component.html',
  styleUrls: ['./more-info-affiliates.component.css']
})
export class MoreInfoAffiliatesComponent implements OnInit {
  public uid:string = '';
  public first_name:string = '';
  public email:string = '';
  public last_name:string = '';
  public email_name:string = '';
  public document:string = '';
  public gender:string = '';
  public phone:number = 0;
  public document_type:string = '';
  public marital_status:string = '';
  public birthday:string = '';
  public country:string = '';
  public municipality:string = '';
  public neighborhood:string = '';
  public department:string = '';
  public offset:number = 0;
  public limit:number = 200;
  public address:string = '';
  public address_detail:string = '';

  public doc_types:any[]= [];
  public genders:any[] = [];
  public countries:any[] = [];
  public municipalities:any[] = [];
  public dpts:any[] = [];
  public neighborhoods:any[] = [];
  constructor(private affiliatesSvc:AffiliatesService, private globalSvc:GLobalService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.uid = id;
    });
    this.GetAffiliates();
    this.GetCountries();
    this.GetDocTypes();
    this.GetGenders();
  }

  GetAffiliates(){
    this.affiliatesSvc.GetAfilliateByID(this.uid)
              .subscribe({
                error:(err:any) =>{
                  console.log(err);
                },
                next:(resp:any) => {
                  this.first_name = resp.first_name;
                  this.last_name = resp.last_name;
                  this.email = resp.email;
                  this.document = resp.document;
                  this.document_type = resp.document_type;
                  this.gender = resp.gender;
                  this.phone = resp.phone_number;
                  this.address = resp.address[0].name;
                  this.address_detail = resp.address[0].address_detail;
                  this.neighborhood = resp.address[0].neighborhood.id;
                  this.marital_status = resp.affiliate.marital_status;
                  this.birthday = resp.affiliate.birthdate;
                  this.country = resp.address[0].neighborhood.municipality.department.country.id;
                  this.department = resp.address[0].neighborhood.municipality.department.id;
                  this.municipality = resp.address[0].neighborhood.municipality.id;
                  this.GetDpt();
                  this.GetMunicipalities();
                  this.GetNeighborhood();
                }
              });
  };

  UpdateAffiliate(){
    const body = {
        first_name: this.first_name,
        last_name: this.last_name,
        document: this.document,
        // document_type: this.document_type,
        email: this.email,
        phone_number: this.phone,
        gender:this.gender,
    };

    this.affiliatesSvc.UpdateAffiliate(this.uid, body)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                  Swal.fire('Oooops', 'No pudimos actualizar este usuario', 'error');
                },
                next:(resp:any) => {
                      Swal.fire('Éxito', 'Usuario actualizado', 'success');
                  this.router.navigateByUrl('/Dashboard/affiliates');
                }
              })
  };

  GetCountries(){
    this.globalSvc.GetCountries()
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              this.countries = resp.results;
            }
          });
  };

  GetDpt(){
    this.globalSvc.GetDepartments(this.country)
            .subscribe({
               error:(err:any) => {
                console.log(err);
               },
               next:(resp:any) => {
                  this.dpts = resp.results
               }
            })
  }

  GetMunicipalities(){
    this.globalSvc.GetMunicipality(this.department)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                      this.municipalities = resp.results;
                }
              });
  };

  GetNeighborhood(){
    this.globalSvc.GetNeighborhood(this.municipality,this.limit ,this.offset )
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                      this.neighborhoods = resp.results;
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
                      this.genders = resp.results
                }
              });
  };


  GetDocTypes(){
    this.globalSvc.GetDocumentTypes()
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                  this.doc_types = resp.results;
              }
            });
  };





  // users/id/ patch






}
