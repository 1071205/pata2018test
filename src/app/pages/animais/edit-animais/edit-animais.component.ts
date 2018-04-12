import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from '../../../models/Animal';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-edit-animais',
  templateUrl: './edit-animais.component.html',
  styleUrls: ['./edit-animais.component.scss']
})
export class EditAnimaisComponent implements OnInit {

  sub : Subscription;

  animalId: String = '';

  nomeAnimal: String = '';
  tipoAnimal: String = '';
  racaAnimal: String = '';
  idadeAnimal: String = '';


  animal : Animal = new Animal();
  

  loading : boolean = false;

  public user = { id: '', email: '', name: '', role: '' };
  

  public selectOptions = [
    "M",
    "F"
  ];

  public generoAnimal = '';

  constructor(public authService: AuthService, private activeRoute: ActivatedRoute, private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {

    this.user = this.authService.getUser();

    this.sub = this.activeRoute.params.subscribe(params => {
      this.animalId = params['id'];
    }),

    this.populateForm()
   
  }



  populateForm() {

    console.log("populate form")
    this.loading = true;
    this.http.get<Animal>('/animais/'+this.animalId)
    .subscribe(
      response => {
          this.animal = response;
          this.generoAnimal = this.animal.genero.toUpperCase();
          this.loading = false;
      },
      err => this.handleError(err)
    );
  }

/*
  <div class="input-group mb-4">
  <select class="form-control" name="genero" [(ngModel)]="generoAnimal">
      <option value="F">Femea</option>
      <option value="M">Macho</option>
  </select>
</div>
*/



  updateAnimal() {
    
    console.log("Dentro de editAnimal");
    this.loading = true;
    let userId = this.user.id;
    console.log("nome animal: ",this.nomeAnimal)
    this.http.put('/animais/'+this.animalId, { 
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

  private handleError(err) {
    if (this.loading) {
        this.loading = false;
    }
    this.toastr.error(err.error.message, 'Erro');
  }



}


