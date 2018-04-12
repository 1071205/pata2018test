import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimaisComponent } from './animais.component';
import { CreateAnimaisComponent } from './create-animais/create-animais.component'
import { EditAnimaisComponent } from './edit-animais/edit-animais.component'

import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Animais'
        },
        children: [{
            path: '',
            component: AnimaisComponent,
            pathMatch: 'full',
            data: {
                title: 'Lista Animais',
                requiredRole: ['admin', 'responsavelanimais']
            },
            canActivate: [AuthGuard]
        }, {
            path: 'criar',
            data: {
                title: 'Criar Animal',
                requiredRole: ['admin', 'responsavelanimais']
            },
            component: CreateAnimaisComponent,
            canActivate: [AuthGuard]
        }, {
            path: ':id/editar',
            data: {
                title: 'Editar Animal',
                requiredRole: ['admin', 'responsavelanimais']
            },
            component: EditAnimaisComponent,
            canActivate: [AuthGuard]
        }]
    }
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnimaisRoutingModule {}
