import { NgModule } from '@angular/core';

import { AnimaisComponent } from './animais.component';

import { AnimaisRoutingModule } from './animais-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CreateAnimaisComponent } from './create-animais/create-animais.component';
import { EditAnimaisComponent } from './edit-animais/edit-animais.component';


@NgModule({
    imports: [ AnimaisRoutingModule, SharedModule ],
    declarations: [
        AnimaisComponent,
        CreateAnimaisComponent,
        EditAnimaisComponent,
    ]
})
export class AnimaisModule { }
