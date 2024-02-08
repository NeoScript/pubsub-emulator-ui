import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Topic } from 'src/app/services/pubsub.service';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss']
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
