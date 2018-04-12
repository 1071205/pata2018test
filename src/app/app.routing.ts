import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

// Guards
import { AuthGuard } from './guards/auth.guard';

import { P404Component } from './pages/404.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Início'
        },
        children: [
            {
                path: 'home',
                loadChildren: './pages/home/home.module#HomeModule',
            },
            {
                path: 'animais',
                canActivate: [AuthGuard],
                data: {
                    requiredRole: ['admin', 'responsavelanimais']
                },
                loadChildren: './pages/animais/animais.module#AnimaisModule',
            },

        ]
    },
    {
        path: 'auth',
        component: SimpleLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './pages/auth/auth.module#AuthModule',
            }
        ]
    },
    { path: 'not-found', component: P404Component },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    declarations: [P404Component]
})
export class AppRoutingModule {}
