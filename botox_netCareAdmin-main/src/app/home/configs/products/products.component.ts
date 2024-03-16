import { Component, OnInit } from '@angular/core';
import { Config } from 'dompurify';
import { ConfigService } from '../../../services/config.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public Products:any [] = [];
  public name: string = '';
  public description: string = '';
  public price: any = 0;
  public image: any;
  public limit:number = 10;
  public page:number = 1;
  public offset:number = 0;
  public next:any;
  public previous:any;
  public is_active:any = true;
  public searchTerm:string ='';
  constructor(private configSvc:ConfigService, private router:Router) { }

  ngOnInit(): void {
    this.GetProducts();
  }

  NewProduct(){

      const fd = new FormData();
      fd.append('name', this.name);
      fd.append('description', this.description);
      fd.append('price', this.price);
      fd.append('image', this.image);
      fd.append('is_active', this.is_active);

      this.configSvc.NewProduct(fd)
              .subscribe({
                error:(err:any) => {
                  Swal.fire('Oooops', 'Revisa los campos y vuelve a intentarlo', 'error');
                },
                next:(resp:any) => {
                  Swal.fire('Éxito', 'Producto creado', 'success');
                  this.router.navigateByUrl(`/Dashboard/config/Products/${resp.id}`);
                }
              });
  };

  GetProducts(){
    this.configSvc.GetProducts(this.offset, this.limit, this.searchTerm)
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                this.Products = resp.results;
                this.next = resp.next;
                this.previous = resp.previous;
              }
            });
  };

  BlockProduct(id:string, is_active:boolean){
    const body = {
        is_active: !is_active
    }
    Swal.fire({
      title: '¿Estas seguro de deshabilitar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deshabilitar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.configSvc.EditProduct(id, body)
        .subscribe({
          error:(err:any) => {
            Swal.fire('Oooops', 'No pudimos realizar esta acción, vuelve a intentarlo', 'error');
          },
          next:(resp:any) => {
            Swal.fire('Exito!', 'Se realizó correctamente el cambio', 'success');
            this.GetProducts();
          }
        })

      };
    });

  };


  UnBlockProduct(id:string, is_active:boolean) {
    const body = {
      is_active: !is_active
    }
    Swal.fire({
      title: '¿Estas seguro de habilitar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, habilitar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.configSvc.EditProduct(id, body)
        .subscribe({
          error:(err:any) => {
            Swal.fire('Oooops', 'No pudimos realizar esta acción, vuelve a intentarlo', 'error');
          },
          next:(resp:any) => {
            Swal.fire('Exito!', 'Se realizó correctamente el cambio', 'success');
            this.GetProducts();
          }
        })

      };
    });

  };


  DeleteProduct(id:string){
    Swal.fire({
      title: '¿Estas seguro de eliminar este Producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.configSvc.DeleteProduct(id)
        .subscribe({
          error:(err:any) => {
            Swal.fire('Oooops', 'No pudimos eliminar este Producto', 'error');
          },
          next:(resp:any) => {
            Swal.fire('Exito!', 'Producto eliminado', 'success');
            this.GetProducts();
          }
        });
      };
    });
  };


  Pagination(value:number){
    this.page += value;

    if(this.page > 0){
      this.offset = (this.limit * this.page) -  this.limit;
    } else if(this.page <  1){
      this.page === 1;
    } else if(this.Products.length === 0){
      this.offset = (this.limit * (this.page - 1)) -  this.limit;
    }
    this.GetProducts();
  };
  // On file Select - Services
  onChangeImages(event:any) {
    this.image = event.target.files[0];
  };
}
