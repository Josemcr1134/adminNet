import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdvisersService } from '../../../services/advisers.service';

@Component({
  selector: 'app-disabled-enabled-adviser',
  templateUrl: './disabled-enabled-adviser.component.html',
  styleUrls: ['./disabled-enabled-adviser.component.css']
})
export class DisabledEnabledAdviserComponent implements OnInit {

  public ID:string = '';
  public f_type:string = '';
  public reason:string = '';
  constructor( private activatedRoute:ActivatedRoute, private adviserSvc:AdvisersService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id,  type}) => {
      this.ID = id;
      this.f_type = type;
    });

    console.log(this.ID, this.f_type)
  }

  UpdateAdviser(action:string){
    const body = {      
        status: action,
        reason:this.reason      
    }
    this.adviserSvc.UpdateAdviser(this.ID, body)
            .subscribe({
              error:(err:any) => {
                console.log(err);
                Swal.fire('Oooops', 'No pudimos actualizar este asesor ', 'warning');
              },
              next:(resp:any) => {
                console.log(resp);
                Swal.fire('Exito', 'Asesor actualizado', 'success');
                this.router.navigateByUrl('/Dashboard/advisers/listAdviser');
              }
            })
  }
}
