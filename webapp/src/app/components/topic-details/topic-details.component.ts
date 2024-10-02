import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Topic } from 'src/app/services/pubsub.service';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
    selector: 'app-topic-details',
    templateUrl: './topic-details.component.html',
    styleUrls: ['./topic-details.component.scss'],
    standalone: true,
    imports: [MatButton, MatIcon, MatFormField, MatInput, CdkTextareaAutosize, ReactiveFormsModule]
})
export class TopicDetailsComponent implements OnInit {

  @Input() topic?: Topic

  @Output() onMessagePublish = new EventEmitter<{ topic: Topic, message: string }>()

  public inputField = new UntypedFormControl('', Validators.required)
  constructor() { }

  ngOnInit(): void {
  }

  publishMessage() {
    console.log("this value was found", this.inputField.value)

    this.onMessagePublish.emit({ topic: this.topic!, message: this.inputField.value })
    this.inputField.reset()
  }

}
