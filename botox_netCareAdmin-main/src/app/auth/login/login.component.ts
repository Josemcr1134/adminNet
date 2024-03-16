import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username:string = '';
  public password:string ='';
  public usernameStatus:boolean = true;
  constructor(private authSvc:AuthService, private router:Router) { }

  ngOnInit(): void {
    sessionStorage.clear();
    localStorage.clear();
  }
  Login(){
    const fd = new FormData()
    fd.append('username', this.username);
    fd.append('email', this.username);
    fd.append('password', this.password);

    this.authSvc.login(fd)
          .subscribe({
            error:(error:any) => {
              Swal.fire('Ooops', 'Usuario o contraseña con incorrectos', 'error');
            },
            next:(resp:any) => {
              if (resp.user.is_staff) {
                sessionStorage.setItem('net_token', resp.token);
                sessionStorage.setItem('username', resp.user.username);
                sessionStorage.setItem('email', resp.user.email);
                sessionStorage.setItem('admin_id', resp.user.pk);
                this.router.navigateByUrl('/Dashboard/Home');

              } else if(!resp.user.is_staff) {
                Swal.fire('Oooops', 'Usuario o contraseña con incorrectos', 'error');
              };
            }
          });
  };

  validarEmail() {
    return this.usernameStatus = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.username);
  }


}


