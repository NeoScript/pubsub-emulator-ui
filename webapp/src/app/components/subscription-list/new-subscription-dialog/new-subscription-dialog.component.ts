import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PushConfig, Topic } from 'src/app/services/pubsub.service';
import { MatStepper, MatStep, MatStepLabel, MatStepperNext } from '@angular/material/stepper';
import { MatActionList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-new-subscription-dialog',
    templateUrl: './new-subscription-dialog.component.html',
    styleUrls: ['./new-subscription-dialog.component.scss'],
    standalone: true,
    imports: [MatStepper, MatStep, MatStepLabel, MatActionList, MatListItem, MatStepperNext, MatIcon, MatFormField, MatLabel, MatHint, MatInput, ReactiveFormsModule, NgIf, MatButton]
})
export class NewSubscriptionDialogComponent implements OnInit {

  configType?: string
  topic?: Topic

  subscriptionForm = new UntypedFormControl('', Validators.required)
  endpointForm = new UntypedFormControl('', Validators.required)

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
