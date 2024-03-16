import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public adminFunctions:boolean = false;
  public sidebar:boolean = true;
  public allies:boolean = false;
  public advisers:boolean = false;
  public config:boolean = false;
  public changePassword:boolean = false;
  public samePassword:boolean = true;
  public password:string = '';
  public password2:string = '';

  public offsetFilesChargeLegalStaff:number = 0;
  public legalStaff:number = 2;
  public resultFilesChargedLegalStaff:number = 0;
  public pageFilesChargeLegalStaff:number = 1;
  public LegalFilesChargeStaffs:any[] = [];

  public offsetNaturalDoctorFilesCharged:number = 0;
  public resultsNaturalDoctorFilesSent:number = 0;
  public NaturalFilesSentDoctors:any[] = [];
  public pageNaturalDoctorFilesSent:number = 1;
  public limit:number = 10;

  public NaturalDoctor:number = 4;
  public showNotif:boolean = false;
  public searchTerm:string = '';
  constructor(private authSvc:AuthService, private userSvc:UserService) { }

  ngOnInit(): void {
    this.GetNaturalDoctorFilesCharged();
    this.GetLegalStaffFilesCharged();
  }
 // FILES CHARGED NATURAL DOCTORS
 GetNaturalDoctorFilesCharged(){
  this.userSvc.GetUsers(this.NaturalDoctor,'files-sent', this.limit, this.offsetNaturalDoctorFilesCharged, this.searchTerm )
  .subscribe({
    error:(err:any) => {
      console.log(err);
    },
    next:(resp:any) => {
      this.NaturalFilesSentDoctors = resp.results;
      this.resultsNaturalDoctorFilesSent = resp.count;
    }
  });
};
 // CHARGED FILES LEGAL STAFF
 GetLegalStaffFilesCharged(){
  this.userSvc.GetUsers(this.legalStaff,'files-sent', this.limit, this.offsetFilesChargeLegalStaff, this.searchTerm )
  .subscribe({
    error:(err:any) => {
      console.log(err);
    },
    next:(resp:any) => {
      this.LegalFilesChargeStaffs = resp.results;
      this.resultFilesChargedLegalStaff = resp.count;
    }
  });
};

  showAdminFunctions(){
    this.adminFunctions = !this.adminFunctions;
  };
  showNotifFunctions(){
    this.showNotif = !this.showNotif;
  };
  showSideBarMenu(){
    this.sidebar = !this.sidebar;
  };
  showAlliesMenu(){
    this.allies = !this.allies;
  };
  showAdvisersMenu(){
    this.advisers = !this.advisers;
  };
  showConfigMenu(){
    this.config = !this.config;
  };
  ShowChangePasswordModal(){
    this.changePassword = !this.changePassword;
  };

  VerifySamePasswords(){
    if (this.password === this.password2) {
        return this.samePassword = true;
    } else {
      return this.samePassword = false;
    };
  };

  ChangePassword(){
    const body = {
      new_password1: this.password,
      new_password2: this.password2
    };

    this.authSvc.ChangePassword(body)
            .subscribe({
              error:(err:any) => {
                console.log(err);
                Swal.fire('Oooops', 'La contraseña no cumple con los criterios de seguridad, intente', 'error');
              },
              next:(resp:any) => {
                Swal.fire('Éxito', 'Contraseña creada correctamente', 'success');
                this.changePassword = !this.changePassword;
                this.password = '';
                this.password2 = '';
              }
            })

  }
}
