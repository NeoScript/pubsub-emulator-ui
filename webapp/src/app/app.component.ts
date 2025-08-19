import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { PubsubService } from './services/pubsub.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [NavbarComponent, RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'webapp';
  private route = inject(ActivatedRoute);
  private pubsub = inject(PubsubService);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const host = params.get('host');
      if (host) {
        this.pubsub.setHost(host);
      }
    });
  }
}
