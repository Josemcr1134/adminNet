import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllieservService } from '../../../services/allieserv.service';


import { SpecialistService } from '../../../services/specialist.service';


@Component({
  selector: 'app-aprove-allie-docs',
  templateUrl: './aprove-allie-docs.component.html',
  styleUrls: ['./aprove-allie-docs.component.css']
})
export class AproveAllieDocsComponent implements OnInit {
  public ID:string = '';
  public document:string = '';
  public rut:any = '';
  public logo:any = '';
  public chamber_of_comerce:any = '';
  public name:any = ''
  public reason:string = '';
  public signature_image:string = '';

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private specialistSvc:SpecialistService, private allieser : AllieservService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id,name}) => {
      this.ID = id;
      this.name = name
    });
    this.getAllyFiles();
  };

  getAllyFiles(){

    this.specialistSvc.GetAllieFiles(this.ID)
              .subscribe({
                error:(err:any) =>{
                  console.log(err);
                },
                next:(resp:any) => {
                  console.log(resp);
                  this.rut = resp.rut;
                  this.document = resp.document;
                  this.logo = resp.logo;
                  this.chamber_of_comerce = resp.chamber_of_commerce;
                  this.signature_image = resp.signature_image;
                }
              });
  };

  updateAllie(action:string){
    const body = {
        status: action ,
        reason: this.reason
    }
      this.allieser.updateAllies(this.ID, body)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                  Swal.fire('Oooops', 'No pudimos actualizar este Aliado ', 'warning');
                },
                next:(resp:any) => {
                  console.log(resp);
                  Swal.fire('Exito', 'Aliado actualizado', 'success');
                  this.router.navigateByUrl('/Dashboard/allies/AlliesList');
                }
              });
  };
}



