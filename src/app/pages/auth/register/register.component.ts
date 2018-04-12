import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  templateUrl: 'register.component.html'
})

export class RegisterComponent {

  errors: Array<string> = [];
  email: string = '';
  name: string = '';
  password: string = '';
  passwordConfirmation: string = '';
  role: string = '';
  acordo: boolean;
  loading: boolean = false;
  constructor(public authService: AuthService, private http: HttpClient, private toastr: ToastrService, private router: Router) { }


  registerResponsavelAnimais() {

    console.log("Register Responsavel Animais")
    this.loading = true;
    this.errors = [];


    if (this.password != this.passwordConfirmation) {
      this.errors.push('As Passwords não são iguais');
      this.loading = false;
      return;
    }

    console.log("this.role ", this.role)

    this.http.post('auth/register', { email: this.email, name: this.name, password: this.password,  role: 'responsavelanimais' }).subscribe(
      (res: any) => {
        this.authService.setToken(res.token);
        this.toastr.success('Conta criada com sucesso!');
        this.router.navigate(['/']);
        this.loading = false;
      },
      err => {
        for (let error of err.error.data) {
          this.errors.push(error.message);
        }
        this.loading = false;
      }
    );
  }

}
