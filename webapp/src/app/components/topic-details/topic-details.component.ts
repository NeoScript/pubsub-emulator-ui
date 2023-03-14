import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Topic } from 'src/app/services/pubsub.service';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss']
})
export class TopicDetailsComponent implements OnInit {

  @Input() topic?: Topic

  @Output() onMessagePublish = new EventEmitter<{ topic: Topic, message: string, attributes: object }>()

  public inputField = new FormControl('', Validators.required)
  public keyField = new FormControl('event')
  public valueField = new FormControl('')

  constructor() { }

  ngOnInit(): void {
  }

  publishMessage() {
    console.log("inputField: ", this.inputField.value)
    console.log("keyField: ", this.keyField.value)
    console.log("valueField: ", this.valueField.value)

    let attr = {
      rawjson: ""
    }

    if (this.keyField.value && this.valueField.value) {
      Object.assign(attr, { [this.keyField.value]: this.valueField.value });
    }

    this.onMessagePublish.emit({ topic: this.topic!, message: this.inputField.value, attributes: attr })
    this.inputField.reset()
  }

}
