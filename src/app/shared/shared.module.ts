import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { NameSearchFilterPipe } from './pipes/nameSearchFilter/nameSearchFilter.pipe';
import { FormatDatePipe } from './pipes/format-date/format-date.pipe';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { TabsModule, ModalModule, BsDropdownModule, BsDatepickerModule, TooltipModule } from 'ngx-bootstrap';
@NgModule({
    declarations: [
        FilterPipe,
        NameSearchFilterPipe,
        FormatDatePipe,
        NotificationsComponent
    ],
    imports:      [ 
        CommonModule, 
        FormsModule, 
        BsDropdownModule.forRoot(), 
        BsDatepickerModule.forRoot(),
        TabsModule.forRoot(),
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
    ],
    exports:      [ 
        CommonModule, 
        FormsModule, 
        BsDropdownModule, 
        BsDatepickerModule,
        TabsModule,
        ModalModule,
        TooltipModule,
        FilterPipe, 
        NameSearchFilterPipe, 
        FormatDatePipe, 
        NotificationsComponent
    ]
})
export class SharedModule { }
