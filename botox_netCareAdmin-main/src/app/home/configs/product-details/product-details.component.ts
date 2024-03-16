import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public name: string = '';
  public description: string = '';
  public price: any = 0;
  public image: any;
  public pid:string = '';
  constructor( private activatedRoute:ActivatedRoute, private router:Router, private configSvc:ConfigService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.pid = id;
    });

    this.GetProductById();
  };

  GetProductById(){
    this.configSvc.GetProductByID(this.pid)
                .subscribe({
                  error:(err:any) => {
                    console.log(err);
                  },
                  next:(resp:any) =>{
                    this.name = resp.name;
                    this.description = resp.description;
                    this.price = resp.price;
                  }
                })
  }

  EditProduct(){
    const fd = new FormData();
    fd.append('name', this.name);
    fd.append('description', this.description);
    fd.append('price', this.price);


    this.configSvc.EditProduct(this.pid, fd)
            .subscribe({
              error:(err:any) => {
                Swal.fire('Oooops', 'No se pudo guardar la información, el formulario se encuentra incompleto', 'error');
              },
              next:(resp:any) => {
               Swal.fire('Éxito', 'Información guardada correctamente', 'success');
                this.router.navigateByUrl(`/Dashboard/config/Products`);
              }
            });
  }
}
