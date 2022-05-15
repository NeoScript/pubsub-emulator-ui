import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PubsubService } from 'src/app/services/pubsub.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  projectList$: Observable<string[]>

  constructor(private pubsub: PubsubService) {
    this.projectList$ = pubsub.projectList$
  }

  ngOnInit(): void {
  }

}
