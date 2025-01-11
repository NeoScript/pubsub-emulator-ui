import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogContainer, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { PushConfig, Topic } from 'src/app/services/pubsub.service';
import { MatStepper, MatStep, MatStepLabel, MatStepperNext } from '@angular/material/stepper';
import { MatActionList, MatListItem, MatListItemIcon, MatListItemLine, MatListItemTitle } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-new-subscription-dialog',
  templateUrl: './new-subscription-dialog.component.html',
  styleUrls: ['./new-subscription-dialog.component.scss'],
  standalone: true,
  imports: [MatStepper, MatStep, MatStepLabel, MatActionList, MatListItem, MatStepperNext, MatIcon, MatFormField, MatLabel, MatHint, MatInput, ReactiveFormsModule, MatButton, MatDialogContent,
    MatListItemIcon, MatListItemLine, MatListItemTitle
  ]
})
export class NewSubscriptionDialogComponent implements OnInit {
  private ref = inject<MatDialogRef<NewSubscriptionDialogComponent, NewSubscriptionRequest>>(MatDialogRef);


  configType?: string
  topic?: Topic

  subscriptionForm = new UntypedFormControl('', Validators.required)
  endpointForm = new UntypedFormControl('', Validators.required)

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
