import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'src/app/services/pubsub.service';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {

  @Input() subscriptions?: Subscription[]

  @Input() currentSubscription?: Subscription
  @Output() currentSubscriptionChange = new EventEmitter<Subscription>()
  constructor() { }

  ngOnInit(): void {

    console.log("sublist =", this.subscriptions)
    console.log("current sub =", this.currentSubscription)
  }

  selectSubscription(subscription: Subscription) {
    this.currentSubscription = subscription
    this.currentSubscriptionChange.emit(subscription)
  }

}
