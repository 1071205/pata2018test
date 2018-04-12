import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable()
export class WebSocketService {
    private socket: any;
    constructor() { 
        this.socket = io.connect(environment.socketUrl, {transports:  ['websocket']});
    }
    
    public fromEvent(event: string): Observable<any> {
        let observable = new Observable<any>(observer => {
            this.socket.on(event, (msg) => {
                observer.next(msg);
            });
            return () => {
                // The observer has unsubscribed
                this.socket.off(event);
            }; 
        });
        return observable;
    }
}
