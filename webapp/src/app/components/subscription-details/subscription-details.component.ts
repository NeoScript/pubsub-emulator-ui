import { Component, Input, OnInit } from '@angular/core';
import { PubsubService } from 'src/app/services/pubsub.service';

@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.scss']
})
export class SubscriptionDetailsComponent implements OnInit {

  @Input() subscriptionPath?: string
  constructor(private pubsub: PubsubService) { }

  ngOnInit(): void {
  }

}
