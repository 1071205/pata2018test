import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { HomeComponent } from './home.component';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [ HomeRoutingModule, SharedModule, ChartsModule ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule { }
