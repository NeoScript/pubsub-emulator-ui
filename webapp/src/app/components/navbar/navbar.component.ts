import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  Observable, filter } from 'rxjs';
import { PubsubService } from 'src/app/services/pubsub.service';
import { InputDialogComponent } from '../input-dialog/input-dialog.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [MatToolbar, MatIconButton, RouterLink, MatIcon, AsyncPipe]
})
export class NavbarComponent implements OnInit {
  private pubsub = inject(PubsubService);
  private dialog = inject(MatDialog);


  currentHost: Observable<string>
  constructor() {
    const pubsub = this.pubsub;

    this.currentHost = pubsub._currentHost$.asObservable();
  }

  ngOnInit(): void {
  }

  updateHostUrl() {
    const ref = this.dialog.open(InputDialogComponent)
    ref.afterClosed().pipe(filter(result => !!result))
      .subscribe((result: { user_input: string }) => {
        this.pubsub.setHost(result.user_input)
      })
  }

}
