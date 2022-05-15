import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PubsubService } from 'src/app/services/pubsub.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentHost: string
  constructor(private pubsub: PubsubService) {
    this.currentHost = pubsub.currentHost;
   }

  ngOnInit(): void {
  }

}
