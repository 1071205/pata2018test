import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../../../services/web-socket.service';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    notifications: Array<{text: string; id: string}> = [];
    unread: number = 0;

    constructor(
        private socket: WebSocketService, 
        private authService: AuthService, 
        private toastr: ToastrService,
        private router: Router
    ) { }
    
    ngOnInit() {
        this.listenForNotifications();
    }

    ngOnDestroy() {
        this.removeListeners();
    }

    public toggled(open: boolean): void {
        this.unread = 0;
    }

    public handleClick(index: number) {
        let notif = this.notifications[index];
        this.notifications.splice(index, 1);
        //this.router.navigate(['/receitas', notif.id, 'detalhes']);
    }

    private listenForNotifications() {
        if (!this.authService.isAuthenticated()) {
            return;
        }
        const channel = `notifications.${this.authService.getUser().id}`;
        this.subscription = this.socket.fromEvent(channel).subscribe(
            msg => {
                this.unread += 1;
                this.notifications.push(msg);
                this.toastr.info('Recebeu uma nova notificação!');
            }
        );
    }

    private removeListeners() {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }
    
}
