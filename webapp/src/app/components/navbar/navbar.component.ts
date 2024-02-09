import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  Observable, filter } from 'rxjs';
import { PubsubService } from 'src/app/services/pubsub.service';
import { InputDialogComponent } from '../input-dialog/input-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentHost: Observable<string>
  constructor(private pubsub: PubsubService, private dialog: MatDialog) {
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
