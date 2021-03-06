import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CanActivateChild } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/auth/login']);
            return false;
        }

        // At this point, we know the user is authenticated
        // But we still need to make sure he has permissions to acess the route
        let requiredRole = route.data['requiredRole'];
        console.log("requiredRole: ", requiredRole)
        if (requiredRole && !this.authService.hasRole(requiredRole)) {
            this.toastr.error('Você não tem permissões para aceder a esta página');
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
    
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}
