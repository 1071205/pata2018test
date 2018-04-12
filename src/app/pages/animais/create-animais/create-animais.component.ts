import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-animais',
  templateUrl: './create-animais.component.html',
  styleUrls: ['./create-animais.component.scss']
})
export class CreateAnimaisComponent implements OnInit {

  nomeAnimal: String = '';
  tipoAnimal: String = '';
  racaAnimal: String = '';
  generoAnimal: String = '';
  idadeAnimal: String = '';


  loading       : boolean = false;

  public user = { id: '', email: '', name: '', role: '' };
  

  constructor(public authService: AuthService, private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.getUser();


  }

  newAnimal() {

    
    console.log("Dentro de newAnimal");
    this.loading = true;
    let userId = this.user.id;
    this.http.post('/utilizadores/'+userId+'/animais', { 
      nome: this.nomeAnimal, 
      tipo: this.tipoAnimal, 
      raca: this.racaAnimal, 
      genero: this.generoAnimal, 
      idade: this.idadeAnimal }).subscribe(
        (res: any) => {
                      
            this.toastr.success('Animal registado com sucesso!');
            this.router.navigate(['/animais']);
            this.loading = false;
        },
        err => {
            this.toastr.error(err.error.message, 'Ocorreu um erro');
            this.loading = false;
        }
    );
    

}



}


