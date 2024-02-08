import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { firstValueFrom } from 'rxjs';
import { Subscription, Topic } from 'src/app/services/pubsub.service';
import { NewSubscriptionDialogComponent, NewSubscriptionRequest } from './new-subscription-dialog/new-subscription-dialog.component';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {

  @Input() subscriptions?: Subscription[]
  @Input() topic?: Topic

  @Input() currentSubscription?: Subscription
  @Output() currentSubscriptionChange = new EventEmitter<Subscription>()
  @Output() newSubscriptionRequest = new EventEmitter<NewSubscriptionRequest>()
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

    console.log("sublist =", this.subscriptions)
    console.log("current sub =", this.currentSubscription)
  }

  selectSubscription(subscription: Subscription) {
    this.currentSubscription = subscription
    this.currentSubscriptionChange.emit(subscription)
  }

  async newSubscription() {
    const ref = this.dialog.open<NewSubscriptionDialogComponent, any, NewSubscriptionRequest>(NewSubscriptionDialogComponent)
    ref.componentInstance.topic = this.topic

    const result = await firstValueFrom<NewSubscriptionRequest | undefined>(ref.afterClosed())
    if (!result) { return } // if no resulting data, just end here!

    console.log("result from dialog", result)
    this.newSubscriptionRequest.emit(result)
  }

}
