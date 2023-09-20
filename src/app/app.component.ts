import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {NotificationType} from 'app/shared/models/notification.model';
import {NotificationService} from 'app/shared/services/notification.service';
import { AuthActionService } from './auth/auth.service';
import { AuthService } from './shared/services/auth.service';
import io from 'socket.io-client/dist/socket.io';
import { Config } from '../../api/config';

var socket;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'app';

  notificationSubscription: Subscription;

  constructor(vcr: ViewContainerRef, 
    private notificationService: NotificationService, 
    private toastr: ToastrService,
    private authActionService: AuthActionService,
    private authService: AuthService) {
    
  }

  ngOnInit() {
    // socket = io(Config.serverIP + ':8080');
    // socket.on('connect', () => {
    //   var flag = false;
    //   var timer = setInterval(() => {
    //     if ( this.authService.getUserID() != null) {
    //       if( !flag && this.authService.getUserID()) {
    //         socket.emit('add user', this.authService.getUserID());
    //         flag = true; 
    //       }
    //     } else {
    //       flag = false;
    //     }
    //   }, 1000);
    // })

    
    this.notificationSubscription = this.notificationService.getObservable().subscribe((notifi) => {

      let html = '';
      switch (notifi.messageType) {
        case NotificationType.Message:
          html = '<div class="container"><div class="row"><div class="col-1 left"><div class="success-icon"></div></div><div class="col-9 right"><div><div class="title">' + notifi.title + '</div><div class="description">' + notifi.message + '</div></div></div></div></div>';
          this.toastr.success(html, null, {enableHtml: true, timeOut: 1500});
          break;
        case NotificationType.Info:
          html = '<div class="container"><div class="row"><div class="col-1 left"><div class="info-icon"></div></div><div class="col-9 right"><div><div class="title">' + notifi.title + '</div><div class="description">' + notifi.message + '</div></div></div></div></div>';
          this.toastr.info(html, null, {enableHtml: true, timeOut: 2500});
          break;
        case NotificationType.Error:
          html = '<div class="container"><div class="row"><div class="col-1 left"><div class="error-icon"></div></div><div class="col-9 right"><div><div class="title">' + notifi.title + '</div><div class="description">' + notifi.message + '</div></div></div></div></div>';
          this.toastr.error(html, null, {enableHtml: true, timeOut: 2500});
          break;
        default:
      }
    });
  }

  ngOnDestroy() {
    this.notificationSubscription.unsubscribe();
    // socket.close();
  }

}
