import { Component, OnInit } from '@angular/core';
import 'tw-elements';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-list-allies',
  templateUrl: './list-allies.component.html',
  styleUrls: ['./list-allies.component.css']
})
export class ListAlliesComponent implements OnInit {
    // # Medicals - Allie Specialist
  // LEGAL_STAFF = 2
  // SUBORDINATE_DOCTOR = 3
  // NATURAL_DOCTOR = 4
  public legalStaff:number = 2;
  public offsetPreRegisteredLegalStaff:number = 0;
  public offsetFilesChargeLegalStaff:number = 0;
  public offsetEnableLegalStaff:number = 0;
  public offsetDisableLegalStaff:number = 0;

  public resultPreRegisteredsLegalStaff:number = 0;
  public resultFilesChargedLegalStaff:number = 0;
  public resultEnableLegalStaff:number = 0;
  public resultDisabledLegalStaff:number = 0;

  public pagePreRegisteredLegalStaff:number = 1;
  public pageFilesChargeLegalStaff:number = 1;
  public pageEnableLegalStaff:number = 1;
  public pageDisabledLegalStaff:number = 1;

  public LegalPreRegisteredStaffs:any[] = [];
  public LegalFilesChargeStaffs:any[] = [];
  public LegalEnabledStaffs:any[] = [];
  public LegalDisabledStaffs:any[] = [];

  public NaturalDoctor:number = 4;

  public offsetNaturalDoctorPreRegistered:number = 0;
  public offsetNaturalDoctorFilesCharged:number = 0;
  public offsetNaturalDoctorEnabled:number = 0;
  public offsetNaturalDoctorDisabled:number = 0;

  public resultsNaturalDoctorPreRegistered:number = 0;
  public resultsNaturalDoctorFilesSent:number = 0;
  public resultsNaturalDoctorEnable:number = 0;
  public resultsNaturalDoctorDisabled:number = 0;

  public NaturalEnabledDoctors:any[] = [];
  public NaturalDisabledDoctors:any[] = [];
  public NaturalFilesSentDoctors:any[] = [];
  public NaturalPreRegisteredDoctors:any[] = [];

  public pageNaturalDoctorPreRegistered:number = 1;
  public pageNaturalDoctorFilesSent:number = 1;
  public pageNaturalDoctorEnabled:number = 1;
  public pageNaturalDoctorDisabled:number = 1;

  public limit:number = 10;
  public searchTermNaturalPre:string = '';
  public searchTermNaturalFiles:string = '';
  public searchTermNaturalEnabled:string = '';
  public searchTermNaturalDisabled:string = '';
  public searchTermLegalPre:string = '';
  public searchTermLegalFiles:string = '';
  public searchTermLegalEnabled:string = '';
  public searchTermLegalDisabled:string = '';
  public searchTerm:string = '';
  constructor(private userSvc:UserService) { }

  ngOnInit(): void {
    this.GetPreRegisterNaturalAllies();
    this.GetNaturalDoctorFilesCharged();
    this.GetNaturalDoctorsEnable();
    this.GetNaturalDoctorsDisabled();
    this.GetPreRegisteredLegalStaff();
    this.GetLegalStaffFilesCharged();
    this.GetLegalStaffEnable();
    this.GetLegalStaffDisabled();
  }

  // PRE REGISTERED NATURAL DOCTORS
  GetPreRegisterNaturalAllies(){
      this.userSvc.GetUsers(this.NaturalDoctor,'pre-registered', this.limit, this.offsetNaturalDoctorPreRegistered, this.searchTermNaturalPre )
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                this.NaturalPreRegisteredDoctors = resp.results;
                this.resultsNaturalDoctorPreRegistered = resp.count;
              }
            })
  };

  PaginationPrerRegisteredNaturalDoctor(value:number){
    this.pageNaturalDoctorPreRegistered += value;

    if(this.pageNaturalDoctorPreRegistered > 0){
      this.offsetNaturalDoctorPreRegistered = (this.limit * this.pageNaturalDoctorPreRegistered) -  this.limit;
    } else if(this.pageNaturalDoctorPreRegistered <  1){
      this.pageNaturalDoctorPreRegistered === 1;
    } else if(this.NaturalPreRegisteredDoctors.length === 0){
      this.offsetNaturalDoctorPreRegistered = (this.limit * (this.pageNaturalDoctorPreRegistered - 1)) -  this.limit;
    }
    this.GetPreRegisterNaturalAllies();
  };


  // FILES CHARGED NATURAL DOCTORS
  GetNaturalDoctorFilesCharged(){
    this.userSvc.GetUsers(this.NaturalDoctor,'files-sent', this.limit, this.offsetNaturalDoctorFilesCharged, this.searchTermNaturalFiles )
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

  PaginationFilesChargeNaturalDoctor(value:number){
    this.pageNaturalDoctorFilesSent += value;

    if(this.pageNaturalDoctorFilesSent > 0){
      this.offsetNaturalDoctorFilesCharged = (this.limit * this.pageNaturalDoctorFilesSent) -  this.limit;
    } else if(this.pageNaturalDoctorFilesSent <  1){
      this.pageNaturalDoctorFilesSent === 1;
    } else if(this.NaturalFilesSentDoctors.length === 0){
      this.offsetNaturalDoctorFilesCharged = (this.limit * (this.pageNaturalDoctorFilesSent - 1)) -  this.limit;
    }
    this.GetNaturalDoctorFilesCharged();
  };


  // ENABLED NATURAL DOCTORS

  GetNaturalDoctorsEnable(){
    this.userSvc.GetUsers(this.NaturalDoctor, 'enabled', this.limit, this.offsetNaturalDoctorEnabled , this.searchTermNaturalEnabled)
                    .subscribe({
                      error:(err:any) => {
                        console.log(err);
                      },
                      next:(resp:any) => {
                        this.NaturalEnabledDoctors = resp.results;
                        this.resultsNaturalDoctorEnable = resp.count;
                      }
                    })
  };

  PaginationEnableNaturalDoctor(value:number){
    this.pageNaturalDoctorEnabled += value;

    if(this.pageNaturalDoctorEnabled > 0){
      this.offsetNaturalDoctorEnabled = (this.limit * this.pageNaturalDoctorEnabled) -  this.limit;
    } else if(this.pageNaturalDoctorEnabled <  1){
      this.pageNaturalDoctorEnabled === 1;
    } else if(this.NaturalFilesSentDoctors.length === 0){
      this.offsetNaturalDoctorEnabled = (this.limit * (this.pageNaturalDoctorEnabled - 1)) -  this.limit;
    }
    this.GetNaturalDoctorsEnable();
  };

  // DISABLED NATURAL DOCTORS
  GetNaturalDoctorsDisabled(){
    this.userSvc.GetUsers(this.NaturalDoctor, 'disabled', this.limit, this.offsetNaturalDoctorDisabled, this.searchTermNaturalDisabled)
                    .subscribe({
                      error:(err:any) => {
                        console.log(err);
                      },
                      next:(resp:any) => {
                        this.NaturalDisabledDoctors = resp.results;
                        this.resultsNaturalDoctorDisabled = resp.count;
                      }
                    });
  };

  PaginationDisabledNaturalDoctor(value:number){
    this.pageNaturalDoctorDisabled += value;

    if(this.pageNaturalDoctorDisabled > 0){
      this.offsetNaturalDoctorDisabled = (this.limit * this.pageNaturalDoctorDisabled) -  this.limit;
    } else if(this.pageNaturalDoctorDisabled <  1){
      this.pageNaturalDoctorDisabled === 1;
    } else if(this.NaturalFilesSentDoctors.length === 0){
      this.offsetNaturalDoctorDisabled = (this.limit * (this.pageNaturalDoctorDisabled - 1)) -  this.limit;
    };
    this.GetNaturalDoctorsDisabled();
  };



  // PRE REGISTERED LEGAL STAFF

  GetPreRegisteredLegalStaff(){
    this.userSvc.GetUsers(this.legalStaff,'pre-registered', this.limit, this.offsetPreRegisteredLegalStaff, this.searchTermLegalPre )
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                console.log(resp)
                this.LegalPreRegisteredStaffs = resp.results;
                this.resultPreRegisteredsLegalStaff = resp.count;
              }
            })
  };

  PaginationPreRegisteredLegalStaff(value:number){
    this.pagePreRegisteredLegalStaff += value;

    if(this.pagePreRegisteredLegalStaff > 0){
      this.offsetPreRegisteredLegalStaff = (this.limit * this.pagePreRegisteredLegalStaff) -  this.limit;
    } else if(this.pagePreRegisteredLegalStaff <  1){
      this.pagePreRegisteredLegalStaff === 1;
    } else if(this.NaturalPreRegisteredDoctors.length === 0){
      this.offsetPreRegisteredLegalStaff = (this.limit * (this.pageNaturalDoctorPreRegistered - 1)) -  this.limit;
    }
    this.GetPreRegisteredLegalStaff();
  };

  // CHARGED FILES LEGAL STAFF
  GetLegalStaffFilesCharged(){
    this.userSvc.GetUsers(this.legalStaff,'files-sent', this.limit, this.offsetFilesChargeLegalStaff, this.searchTermLegalFiles)
    .subscribe({
      error:(err:any) => {
        console.log(err);
      },
      next:(resp:any) => {
        console.log(resp)
        this.LegalFilesChargeStaffs = resp.results;
        this.resultFilesChargedLegalStaff = resp.count;
      }
    });
  };

  PaginationFilesChargeLegalStaff(value:number){
    this.pageFilesChargeLegalStaff += value;

    if(this.pageFilesChargeLegalStaff > 0){
      this.offsetFilesChargeLegalStaff = (this.limit * this.pageFilesChargeLegalStaff) -  this.limit;
    } else if(this.pageFilesChargeLegalStaff <  1){
      this.pageFilesChargeLegalStaff === 1;
    } else if(this.NaturalFilesSentDoctors.length === 0){
      this.offsetFilesChargeLegalStaff = (this.limit * (this.pageFilesChargeLegalStaff - 1)) -  this.limit;
    }
    this.GetLegalStaffFilesCharged();
  };


  // ENABLED LEGAL STAFF
  GetLegalStaffEnable(){
    this.userSvc.GetUsers(this.legalStaff, 'enabled', this.limit, this.offsetEnableLegalStaff, this.searchTermLegalEnabled)
                    .subscribe({
                      error:(err:any) => {
                        console.log(err);
                      },
                      next:(resp:any) => {
                        console.log(resp)
                        this.LegalEnabledStaffs = resp.results;
                        this.resultEnableLegalStaff = resp.count;
                      }
                    })
  };

  PaginationEnableLegalStaff(value:number){
    this.pageEnableLegalStaff += value;

    if(this.pageEnableLegalStaff > 0){
      this.offsetEnableLegalStaff = (this.limit * this.pageEnableLegalStaff) -  this.limit;
    } else if(this.pageEnableLegalStaff <  1){
      this.pageEnableLegalStaff === 1;
    } else if(this.NaturalFilesSentDoctors.length === 0){
      this.offsetEnableLegalStaff = (this.limit * (this.pageNaturalDoctorEnabled - 1)) -  this.limit;
    }
    this.GetLegalStaffEnable();
  };

   // DISABLED LEGAL STAFF
  GetLegalStaffDisabled(){
    this.userSvc.GetUsers(this.legalStaff, 'disabled', this.limit, this.offsetDisableLegalStaff, this.searchTermNaturalDisabled)
                    .subscribe({
                      error:(err:any) => {
                        console.log(err);
                      },
                      next:(resp:any) => {
                        console.log(resp)
                        this.LegalDisabledStaffs = resp.results;
                        this.resultDisabledLegalStaff = resp.count;
                      }
                    });
  };

  PaginationDisabledLegalStaff(value:number){
    this.pageDisabledLegalStaff += value;

    if(this.pageDisabledLegalStaff > 0){
      this.offsetDisableLegalStaff = (this.limit * this.pageDisabledLegalStaff) -  this.limit;
    } else if(this.pageDisabledLegalStaff <  1){
      this.pageDisabledLegalStaff === 1;
    } else if(this.NaturalFilesSentDoctors.length === 0){
      this.offsetDisableLegalStaff = (this.limit * (this.pageDisabledLegalStaff - 1)) -  this.limit;
    };
    this.GetLegalStaffDisabled();
  };
}
