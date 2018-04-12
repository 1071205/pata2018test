import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit { 
    public user = { email: '', name: ''};


    constructor(
        private http: HttpClient,
        public authService: AuthService,
        private toastr: ToastrService
    ) {}
    
    ngOnInit() {
        this.user = this.authService.getUser();
        this.loadData();
    }
    
    loadData() {

    }
    
}
