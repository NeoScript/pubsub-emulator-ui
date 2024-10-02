import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { Subscription, Topic } from 'src/app/services/pubsub.service';
import { NewSubscriptionDialogComponent, NewSubscriptionRequest } from './new-subscription-dialog/new-subscription-dialog.component';
import { MatActionList, MatListItem } from '@angular/material/list';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-subscription-list',
    templateUrl: './subscription-list.component.html',
    styleUrls: ['./subscription-list.component.scss'],
    standalone: true,
    imports: [MatActionList, MatListItem, NgClass, MatIcon]
})
export class SubscriptionListComponent implements OnInit {
  private dialog = inject(MatDialog);


  @Input() subscriptions?: Subscription[]
  @Input() topic?: Topic

  @Input() currentSubscription?: Subscription
  @Output() currentSubscriptionChange = new EventEmitter<Subscription>()
  @Output() newSubscriptionRequest = new EventEmitter<NewSubscriptionRequest>()

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
