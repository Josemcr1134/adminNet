import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import 'tw-elements';
import { SpecialistService } from '../../../services/specialist.service';
import Swal from 'sweetalert2';
import { DiscountsService } from '../../../services/discounts.service';

@Component({
  selector: 'app-allies-pending-aproved-services',
  templateUrl: './allies-pending-aproved-services.component.html',
  styleUrls: ['./allies-pending-aproved-services.component.css']
})
export class AlliesPendingAprovedServicesComponent implements OnInit {
  // STATUS new, evaluated, corrected, closed, passed, refused
  public uid:any = '';
  public name:string = '';
  public limit:number = 8;
  public offsetNewRequestServices:number = 0;
  public offsetCorrectedRequestServices:number = 0;
  public offsetPassedRequestServices:number = 0;
  public offsetRefusedRequestServices:number = 0;
  public offsetEvaluatedRequestServices:number = 0;

  public resultsNewRequestServices:number = 0;
  public resultsCorrectedRequestServices:number = 0;
  public resultsPassedRequestServices:number = 0;
  public resultsRefusedRequestServices:number = 0;
  public resultsEvaluatedRequestServices:number = 0;

  public pageNewRequestServices:number = 1;
  public pageCorrectedRequestServices:number = 1;
  public pagePassedRequestServices:number = 1;
  public pageRefusedRequestServices:number = 1;
  public pageEvaluatedRequestServices:number = 1;

  public NewRequestServices:any[] = [];
  public CorrectedRequestServices:any[] = [];
  public PassedRequestServices:any[] = [];
  public RefusedRequestServices:any[] = [];
  public EvaluatedRequestServices:any[] = [];

  public nextNewRequestServices:any;
  public nextCorrectedRequestServices:any;
  public nextPassedRequestServices:any;
  public nextRefusedRequestServices:any;
  public nextEvaluatedRequestServices:any;
 
  public previousNewRequestServices:any;
  public previousCorrectedRequestServices:any;
  public previousPassedRequestServices:any;
  public previousRefusedRequestServices:any;
  public previousEvaluatedRequestServices:any;

  public offsetAssignedServices:number = 0;
  public resultAssignedServices:number = 0;
  public pageAssignedServices:number = 1;
  public AssignedServices:any[] = [];
  public nextAssignedServices:any;
  public previousAssignedServices:any;

  public newAssignment:number = 0;
  public Licences:any[] = [];
  public LicenceServices:any [] = [];
  public licenseSelected:string  = '';
  public serviceSelected:string  = '';

  public fee:number = 0;
  public netcare_fee:number = 0; 
  public external_fee:number = 0;

  public offsetNewDiscounts:number = 0;
  public resultNewDiscounts:number = 0;
  public pageNewDiscounts:number = 1;
  public NewDiscounts:any[] = [];
  public nextNewDiscounts:any;
  public previousNewDiscounts:any;

  public offsetPassedDiscounts:number = 0;
  public resultPassedDiscounts:number = 0;
  public pagePassedDiscounts:number = 1;
  public PassedDiscounts:any[] = [];
  public nextPassedDiscounts:any;
  public previousPassedDiscounts:any;

  public offsetRefusedDiscounts:number = 0;
  public resultRefusedDiscounts:number = 0;
  public pageRefusedDiscounts:number = 1;
  public RefusedDiscounts:any[] = [];
  public nextRefusedDiscounts:any;
  public previousRefusedDiscounts:any;
  constructor(private specialistSvc:SpecialistService, private activatedRoute:ActivatedRoute, private discountsSvc:DiscountsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id, name}) => {
      this.uid = id;
      this.name = name;
    });
    this.GetNewRequestedServices();
    this.GetCorrectedRequestedServices();
    this.GetPassedRequestedServices();
    this.GetRefusedRequestedServices();
    this.GetAlliesFeeServices();
    this.GetEvaluatedRequestedServices();
    this.GetAllieLicense();
    this.GetNewDiscounts();
    this.GetPassedDiscounts();
    this.GetRefusedDiscounts();
  };
  

  GetNewRequestedServices(){
    this.specialistSvc.GetAlliesServicesRequestsByStatus(this.uid, 'new', this.limit, this.offsetNewRequestServices)
                  .subscribe({
                    error:(err:any) => { 
                              },
                    next:(resp:any) => { 
                      this.NewRequestServices = resp.results;
                      this.resultsNewRequestServices = resp.count;
                      this.nextNewRequestServices = resp.next; 
                      this.previousNewRequestServices = resp.previous;
                    }
                  });
  };

  PaginationNewRequestServices(value:number){
    this.pageNewRequestServices += value;

    if(this.pageNewRequestServices > 0){
      this.offsetNewRequestServices = (this.limit * this.pageNewRequestServices) -  this.limit;
    } else if(this.pageNewRequestServices <  1){
      this.pageNewRequestServices === 1;
    } else if(this.NewRequestServices.length === 0){
      this.offsetNewRequestServices = (this.limit * (this.pageNewRequestServices - 1)) -  this.limit;
    }
    this.GetNewRequestedServices();
  };

  GetEvaluatedRequestedServices(){
    this.specialistSvc.GetAlliesServicesRequestsByStatus(this.uid, 'evaluated', this.limit, this.offsetEvaluatedRequestServices)
                  .subscribe({
                    error:(err:any) => { 
                              },
                    next:(resp:any) => { 
                      this.EvaluatedRequestServices = resp.results;
                      this.resultsEvaluatedRequestServices = resp.count;
                      this.nextEvaluatedRequestServices = resp.next; 
                      this.previousEvaluatedRequestServices = resp.previous;
                    }
                  });
  };
  
  PaginationEvaluatedRequestServices(value:number){
    this.pageEvaluatedRequestServices += value;

    if(this.pageEvaluatedRequestServices > 0){
      this.offsetEvaluatedRequestServices = (this.limit * this.pageEvaluatedRequestServices) -  this.limit;
    } else if(this.pageEvaluatedRequestServices <  1){
      this.pageEvaluatedRequestServices === 1;
    } else if(this.EvaluatedRequestServices.length === 0){
      this.offsetEvaluatedRequestServices = (this.limit * (this.pageEvaluatedRequestServices - 1)) -  this.limit;
    }
    this.GetEvaluatedRequestedServices();
  };
  GetCorrectedRequestedServices(){
    this.specialistSvc.GetAlliesServicesRequestsByStatus(this.uid, 'corrected', this.limit, this.offsetCorrectedRequestServices)
                  .subscribe({
                    error:(err:any) => { 
                              },
                    next:(resp:any) => { 
                      this.CorrectedRequestServices = resp.results;
                      this.resultsCorrectedRequestServices = resp.count;
                      this.nextCorrectedRequestServices = resp.next; 
                      this.previousCorrectedRequestServices = resp.previous;
                    }
                  });
  };
  
  PaginationCorrectedRequestServices(value:number){
    this.pageCorrectedRequestServices += value;

    if(this.pageCorrectedRequestServices > 0){
      this.offsetCorrectedRequestServices = (this.limit * this.pageCorrectedRequestServices) -  this.limit;
    } else if(this.pageCorrectedRequestServices <  1){
      this.pageCorrectedRequestServices === 1;
    } else if(this.CorrectedRequestServices.length === 0){
      this.offsetCorrectedRequestServices = (this.limit * (this.pageCorrectedRequestServices - 1)) -  this.limit;
    }
    this.GetCorrectedRequestedServices();
  };

  GetPassedRequestedServices(){
    this.specialistSvc.GetAlliesServicesRequestsByStatus(this.uid, 'passed', this.limit, this.offsetPassedRequestServices)
                  .subscribe({
                    error:(err:any) => { 
                              },
                    next:(resp:any) => { 
                      this.PassedRequestServices = resp.results;
                      this.resultsPassedRequestServices = resp.count;
                      this.nextPassedRequestServices = resp.next; 
                      this.previousPassedRequestServices = resp.previous;
                    }
                  });
  };

  PaginationPassedRequestServices(value:number){
    this.pagePassedRequestServices += value;

    if(this.pagePassedRequestServices > 0){
      this.offsetPassedRequestServices = (this.limit * this.pagePassedRequestServices) -  this.limit;
    } else if(this.pagePassedRequestServices <  1){
      this.pagePassedRequestServices === 1;
    } else if(this.PassedRequestServices.length === 0){
      this.offsetPassedRequestServices = (this.limit * (this.pagePassedRequestServices - 1)) -  this.limit;
    }
    this.GetPassedRequestedServices();
  };

  GetRefusedRequestedServices(){
    this.specialistSvc.GetAlliesServicesRequestsByStatus(this.uid, 'refused', this.limit, this.offsetRefusedRequestServices)
                  .subscribe({
                    error:(err:any) => { 
                              },
                    next:(resp:any) => { 
                      this.RefusedRequestServices = resp.results;
                      this.resultsRefusedRequestServices = resp.count;
                      this.nextRefusedRequestServices = resp.next; 
                      this.previousRefusedRequestServices = resp.previous;
                    }
                  });
  };

  PaginationRefusedRequestServices(value:number){
    this.pageRefusedRequestServices += value;

    if(this.pageRefusedRequestServices > 0){
      this.offsetRefusedRequestServices = (this.limit * this.pageRefusedRequestServices) -  this.limit;
    } else if(this.pageRefusedRequestServices <  1){
      this.pageRefusedRequestServices === 1;
    } else if(this.RefusedRequestServices.length === 0){
      this.offsetRefusedRequestServices = (this.limit * (this.pagePassedRequestServices - 1)) -  this.limit;
    }
    this.GetRefusedRequestedServices();
  };

  GetAlliesFeeServices(){
      this.specialistSvc.GetAlliesFeeServices(this.uid, this.limit, this.offsetAssignedServices)
                  .subscribe({
                    error:(err:any) => { 
                              }, 
                    next:(resp:any) => {
                      this.AssignedServices = resp.results;
                      this.resultAssignedServices = resp.count;
                      this.nextAssignedServices = resp.next; 
                      this.previousAssignedServices = resp.previous;
                    }
                  });
  };

  PaginationAssignedServices(value:number){
    this.pageAssignedServices += value;

    if(this.pageAssignedServices > 0){
      this.offsetAssignedServices = (this.limit * this.pageAssignedServices) -  this.limit;
    } else if(this.pageAssignedServices <  1){
      this.pageAssignedServices === 1;
    } else if(this.AssignedServices.length === 0){
      this.offsetAssignedServices = (this.limit * (this.pageAssignedServices - 1)) -  this.limit;
    }
    this.GetAlliesFeeServices();
  };

  GetAllieLicense(){
    this.specialistSvc.GetAlliesLicences(this.uid)
          .subscribe({
            error:(err:any) => { 
              }, 
            next:(resp:any) => {          
              this.Licences = resp.results;
            }
          });
  };

  GetLicenseServices(id:string){
    this.specialistSvc.GetServicesWithoutFee(id)
        .subscribe({
          error:(err:any) => {
          }, 
          next:(resp:any) => { 
            this.LicenceServices = resp.results;
            this.newAssignment = 2;
          }
        })
   
  };

  AddNewFeeToServices(value:number, license_id:string = '', service_id:string = '') {
     if(value === 2){
      this.GetLicenseServices(license_id);
      this.licenseSelected = license_id;
      } else if (value === 3){
        this.serviceSelected = service_id;
        this.newAssignment = value;

      }
      else {
      this.newAssignment = value;
     }
  };

  NewAllieFee(){
    const body = {
      license_specialty:this.licenseSelected,
      service:this.serviceSelected, 
      fee:this.fee, 
      netcare_fee:this.netcare_fee, 
      external_fee:this.external_fee
    };

    this.specialistSvc.NewAllyFee(body)
            .subscribe({
              error:(err:any) => { 
                console.log(err, body);
                Swal.fire('Oooops', 'No pudimos asignar la tarifa a este servicio', 'error');
              }, 
              next:(resp:any) => { 
                console.log(resp)
                this.newAssignment = 0;
                this.GetAlliesFeeServices();
                Swal.fire('Éxito', 'Tarifa agregada al servicio correctamente', 'success');
              }
            })
  };


  GetNewDiscounts(){
    this.discountsSvc.GetDiscountsByAllieAndStatus(this.uid, 'new')
              .subscribe({
                error:(err:any) => {
                      }, 
                next:(resp:any) => {
                        this.NewDiscounts = resp.results;
                  this.nextNewDiscounts = resp.next;
                  this.previousNewDiscounts = resp.previous
                }
              });
  };

  PaginationNewDiscounts(value:number){
    this.pageNewDiscounts += value;

    if(this.pageNewDiscounts > 0){
      this.offsetNewDiscounts = (this.limit * this.pageNewDiscounts) -  this.limit;
    } else if(this.pageNewDiscounts <  1){
      this.pageNewDiscounts === 1;
    } else if(this.NewDiscounts.length === 0){
      this.offsetNewDiscounts = (this.limit * (this.pageNewDiscounts - 1)) -  this.limit;
    }
    this.GetNewDiscounts();
  };

  GetPassedDiscounts(){
    this.discountsSvc.GetDiscountsByAllieAndStatus(this.uid, 'passed')
              .subscribe({
                error:(err:any) => {
                      }, 
                next:(resp:any) => {
                        this.PassedDiscounts = resp.results;
                  this.nextPassedDiscounts = resp.next;
                  this.previousPassedDiscounts = resp.previous
                }
              });
  };

  PaginationPassedDiscounts(value:number){
    this.pagePassedDiscounts += value;

    if(this.pagePassedDiscounts > 0){
      this.offsetPassedDiscounts = (this.limit * this.pagePassedDiscounts) -  this.limit;
    } else if(this.pagePassedDiscounts <  1){
      this.pagePassedDiscounts === 1;
    } else if(this.PassedDiscounts.length === 0){
      this.offsetPassedDiscounts = (this.limit * (this.pagePassedDiscounts - 1)) -  this.limit;
    }
    this.GetPassedDiscounts();
  };

  GetRefusedDiscounts(){
    this.discountsSvc.GetDiscountsByAllieAndStatus(this.uid, 'refused')
              .subscribe({
                error:(err:any) => {
                      }, 
                next:(resp:any) => {
                        this.RefusedDiscounts = resp.results;
                  this.nextRefusedDiscounts = resp.next;
                  this.previousRefusedDiscounts = resp.previous
                }
              });
  };

  PaginationRefusedDiscounts(value:number){
    this.pageRefusedDiscounts += value;

    if(this.pageRefusedDiscounts > 0){
      this.offsetRefusedDiscounts = (this.limit * this.pageRefusedDiscounts) -  this.limit;
    } else if(this.pageRefusedDiscounts <  1){
      this.pageRefusedDiscounts === 1;
    } else if(this.RefusedDiscounts.length === 0){
      this.offsetRefusedDiscounts = (this.limit * (this.pageRefusedDiscounts - 1)) -  this.limit;
    }
    this.GetRefusedDiscounts();
  };

  ChangeDiscountStatus(id:string, status:string){
    const body = { 
      status:status
    };
    Swal.fire({
      title: 'Quieres actualizar este descuento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.discountsSvc.ChangeDiscountStatus(id, body)
        .subscribe({
          error:(err:any) => { 
            Swal.fire('Oooops', 'No pudimos actualizar este descuento', 'success');
          }, 
          next:(resp:any) => {
            this.GetNewDiscounts();
            this.GetPassedDiscounts();
            this.GetRefusedDiscounts();
            Swal.fire('Éxito', 'Descuento actualizado', 'success');
          }
        });
      };
    });
    
  }
}
