import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-specialties',
  templateUrl: './edit-specialties.component.html',
  styleUrls: ['./edit-specialties.component.css']
})
export class EditSpecialtiesComponent implements OnInit {
  public s_name:string = '';
  public s_desc:string = '';
  public s_id:string = '';
  constructor(private activatedRoute:ActivatedRoute, private configSvc:ConfigService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id, name, desc}) => {
      this.s_id = id;
      this.s_name = name;
      this.s_desc = desc;
    });
  }


  EditSpecialtie(){
    const body = {
      name:this.s_name,
      description:this.s_desc
    };

    this.configSvc.EditSpecialtie(this.s_id, body)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                  Swal.fire('Oooops', 'Especialidad no pudo ser actualizada', 'error');
                },
                next:(resp:any) => {
                  this.router.navigateByUrl('/Dashboard/config/Specialties');
                  Swal.fire('Éxito', 'Especialidad actualizada', 'success')
                }
              })
  }
}
