import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PushConfig, Topic } from 'src/app/services/pubsub.service';

@Component({
  selector: 'app-new-subscription-dialog',
  templateUrl: './new-subscription-dialog.component.html',
  styleUrls: ['./new-subscription-dialog.component.scss']
})
export class NewSubscriptionDialogComponent implements OnInit {

  configType?: string
  topic?: Topic

  subscriptionForm = new FormControl('', Validators.required)
  endpointForm = new FormControl('', Validators.required)

  constructor(private ref: MatDialogRef<NewSubscriptionDialogComponent, NewSubscriptionRequest>) { }

  ngOnInit(): void {
  }

  setConfigType(type: string) {
    console.log("user slected type", type)
    this.configType = type
  }

  createPushSubscription(): void {
    this.ref.close({
      name: this.subscriptionForm.value,
      topic: this.topic!.name,
      pushConfig: { pushEndpoint: this.endpointForm.value }
    })
  }

  createPullSubscription(): void {
    this.ref.close({
      name: this.subscriptionForm.value,
      topic: this.topic!.name
    })
  }

}

export interface NewSubscriptionRequest {
  name: string
  topic: string
  pushConfig?: PushConfig
}
