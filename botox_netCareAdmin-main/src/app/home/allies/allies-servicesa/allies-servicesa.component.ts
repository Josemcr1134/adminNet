import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllieservService } from 'src/app/services/allieserv.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-allies-servicesa',
  templateUrl: './allies-servicesa.component.html',
  styleUrls: ['./allies-servicesa.component.css']
})
export class AlliesServicesaComponent implements OnInit {
  public medical_id:string = '';
  public limit:number = 10;
  public offsetCollects:number = 0;
  public pageCollects:number = 1;
  public nextCollect:any;
  public previousCollect:any;
  public Collects:any[] = [];
  public offsetAppointment:number = 0;
  public pageAppointment:number = 1;
  public nextAppointments:any;
  public previousAppointments:any;
  public Appointments:any[] = [];
  public AppointmentsCollected:any[] = [];
  public updateAllieCollectModal:boolean = false;
  public Voucher:any[] = [];
  public voucher:any ;
  public reject_reason:string ='';
  public wid:string = '';

  constructor(private activatedRoute:ActivatedRoute, private allieSvc:AllieservService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.medical_id = id;
    });
    this.GetAllieCollectOrders();
    this.GetAttendedAppointmentsByAlly();
  }

  GetAllieCollectOrders(){
    this.allieSvc.GetAlliesOrderCollects(this.medical_id, this.limit, this.offsetCollects)
                .subscribe({
                  error:(err:any) => {
                    console.log(err);
                  },
                  next:(resp:any) => {
                    this.nextCollect = resp.next;
                    this.previousCollect = resp.previous;
                    this.Collects = resp.results;
                  }
                });
  };

  PaginationCollects(value:number){
    this.pageCollects += value;

    if(this.pageCollects > 0){
      this.offsetCollects = (this.limit * this.pageCollects) -  this.limit;
    } else if(this.pageCollects <  1){
      this.pageCollects === 1;
    } else if(this.Collects.length === 0){
      this.offsetCollects = (this.limit * (this.pageCollects - 1)) -  this.limit;
    }
    this.GetAllieCollectOrders();
  };

  GetOrdersCollected(orders:[]){
    this.AppointmentsCollected = orders;
    console.log(orders);
  };

  onSelectVoucher(event:any) {
    this.Voucher.push(...event.addedFiles);
    this.voucher = this.Voucher[0]
  };

  onRemoveVoucher(event:any) {
    this.Voucher.splice(this.Voucher.indexOf(event), 1);
  };

  CatchCollectID(wid:string){
    this.wid = wid;
  };

  UpdateCollect(aprove:any){
    const fd = new FormData();
    if (aprove === true) {
      fd.append('voucher', this.voucher);
      fd.append('is_paid', aprove);
    } else {
      fd.append('reason', this.reject_reason);
    };

    this.allieSvc.UpdateAllieOrderCollect(fd, this.wid)
            .subscribe({
              error:(err:any) => {
                Swal.fire('Oooops', 'No pudimos actualizar esta cuenta de cobro', 'warning');
                console.log(err);
              },
              next:(resp:any) => {
                Swal.fire('Éxito', 'Orden de cobro actualizada', 'success');
                this.updateAllieCollectModal = !this.updateAllieCollectModal;
                this.GetAllieCollectOrders();
                this.Voucher = [];
                this.reject_reason = '';
              }
            });
  };

  GetAttendedAppointmentsByAlly(){
     this.allieSvc.GetAttendedAppointmentsByAllie(this.medical_id, this.limit,this.offsetAppointment)
                .subscribe({
                  error:(err:any) => {
                    console.log(err);
                  },
                  next:(resp:any) => {
                    this.nextAppointments  = resp.next;
                    this.previousAppointments = resp.previous;
                    this.Appointments = resp.results;
                  }
                });
  };

  PaginationAttendedAppointments(value:number){
    this.pageAppointment += value;

    if(this.pageAppointment > 0){
      this.offsetAppointment = (this.limit * this.pageAppointment) -  this.limit;
    } else if(this.pageAppointment <  1){
      this.pageAppointment === 1;
    } else if(this.Collects.length === 0){
      this.offsetAppointment = (this.limit * (this.pageAppointment - 1)) -  this.limit;
    }
    this.GetAttendedAppointmentsByAlly();
  };
}
