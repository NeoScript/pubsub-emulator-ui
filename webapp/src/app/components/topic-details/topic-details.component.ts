import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Topic } from 'src/app/services/pubsub.service';
import { camelCase } from 'lodash';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss']
})
export class TopicDetailsComponent implements OnInit {
  @Input() topic?: Topic

  @Output() onMessagePublish = new EventEmitter<{ topic: Topic, message: string, attributes: object }>()

  public inputField = new FormControl('', Validators.required)
  public errorMessage = ''
  public keyField = new FormControl('event')
  public valueField = new FormControl('')
  public checkBox = new FormControl(true)
  public btnVal = "Publish Message!";
  public btnIcon = "send";

  constructor() { }

  ngOnInit(): void {

  }

  publishMessage() {
    if (this.errorMessage) return;

    let attr = {
      rawjson: ""
    }

    if (this.keyField.value && this.valueField.value) {
      Object.assign(attr, { [this.keyField.value]: this.valueField.value });
    }

    let message = this.inputField.value
    if (this.checkBox.value) {
      message = JSON.stringify(
        this.camelizeKeys(JSON.parse(this.inputField.value))
      );
    }

    this.onMessagePublish.emit({ topic: this.topic!, message: message, attributes: attr })
    // this.inputField.reset()
    this.btnVal = "Published!"
    this.btnIcon = "check"

    setTimeout(() => {
      this.btnVal = "Publish again?";
      this.btnIcon = "send";
    }, 3000);
  }

  camelizeKeys = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(v => this.camelizeKeys(v));

    } else if (obj != null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [camelCase(key)]: this.camelizeKeys(obj[key]),
        }),
        {},
      );
    }

    return obj;
  };

  onFormBlur() {
    try {
      this.errorMessage = ''
      JSON.parse(this.inputField.value)
    } catch (err) {
      this.errorMessage = "JSON is not valid: " + err
    }
  }
}
