import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    email: String = '';
    password: String = '';
    loading: boolean = false;

    constructor(public authService: AuthService, private http: HttpClient, private toastr: ToastrService, private router: Router) { }


    login() {
        console.log("Dentro de login");
        this.loading = true;
        this.http.post('auth/login', { email: this.email, password: this.password }).subscribe(
            (res: any) => {
                var userRole = res.user.role;
                if(userRole != 'responsavelanimais' && userRole != 'admin')
                {
                    this.toastr.error('Apenas médicos têm acesso a esta página', 'Ocorreu um erro');
                    this.loading = false; 
                    return;                   
                }                          
                this.authService.setToken(res.token.token);
                this.toastr.success('Foi autenticado com sucesso!');
                this.router.navigate(['/']);
                this.loading = false;
            },
            err => {
                this.toastr.error(err.error.message, 'Ocorreu um erro');
                this.loading = false;
            }
        );

    }

    
}