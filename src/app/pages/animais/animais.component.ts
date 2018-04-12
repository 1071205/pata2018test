import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../../models/Animal';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthService } from '../../services/auth.service';



@Component({
    selector: 'app-animais',
    templateUrl: 'animais.component.html'
})
export class AnimaisComponent implements OnInit { 
    bsModalRef    : BsModalRef;
    animais : Array<Animal> = [];
    search        : string = "";
    loading       : boolean = false;
    public user = { id: '', email: '', name: '', role: '' };

    constructor(
        private http: HttpClient, 
        private toastr: ToastrService,
        private modalService: BsModalService,
        public authService: AuthService
    ) {}
    
    ngOnInit() {
        this.user = this.authService.getUser();
        console.log("role: ",this.user.role);
        if(this.user.role==="responsavelanimais"){
            console.log("responsavelanimais")
            this.getAnimaisDoResponsavel();
        }else if(this.user.role==="admin"){
            console.log("todos os animais")
            this.getAllAnimais();
        }  
    }
    
    getAnimaisDoResponsavel() {
        console.log("animais do responsavel")
        this.loading = true;
        let userId = this.user.id;
        this.http.get<Animal[]>('/utilizadores/'+userId+'/animais')
        .subscribe(
            response => {
                this.loading = false;
                this.animais = response;
            },
            err => this.handleError(err)
        );
    }

    getAllAnimais(){
        console.log("todos os animais")
        this.loading = true;
        this.http.get<Animal[]>('/animais')
        .subscribe(
            response => {
                this.loading = false;
                this.animais = response;
            },
            err => this.handleError(err)
        );
    }

    private handleError(err) {
        if (this.loading) {
            this.loading = false;
        }
        this.toastr.error(err.error.message, 'Erro');
    }
}
