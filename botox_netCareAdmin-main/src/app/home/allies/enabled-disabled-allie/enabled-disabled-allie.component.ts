import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllieservService } from '../../../services/allieserv.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-enabled-disabled-allie',
  templateUrl: './enabled-disabled-allie.component.html',
  styleUrls: ['./enabled-disabled-allie.component.css']
})
export class EnabledDisabledAllieComponent implements OnInit {
  
  public ID:string = '';
  public f_type:string = '';
  public reason:string = '';  

  constructor( private activatedRoute:ActivatedRoute, private allieser : AllieservService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id,  type}) => {
      this.ID = id;
      this.f_type = type;
    });

    console.log(this.ID, this.f_type)
  }
  
  updateAllie(action:string){
    const body = {      
        status: action,
        reason:this.reason      
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
              })
  }
}
