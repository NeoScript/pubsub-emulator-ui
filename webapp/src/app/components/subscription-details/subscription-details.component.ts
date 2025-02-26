import { Component, Input, OnInit, inject } from '@angular/core';
import { EMPTY, firstValueFrom, map, Observable } from 'rxjs';
import { PubsubService, ReceivedMessage, Subscription } from 'src/app/services/pubsub.service';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSuffix } from '@angular/material/form-field';
import { StringDecoder } from 'string_decoder';

@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.scss'],
  standalone: true,
  imports: [MatButton, MatIcon, MatSuffix, AsyncPipe, DatePipe, JsonPipe]
})
export class SubscriptionDetailsComponent implements OnInit {
  private pubsub = inject(PubsubService);


  @Input() subscriptionPath?: string

  details: Observable<Subscription> = EMPTY
  messages: ReceivedMessage[] = []

  ngOnInit(): void {
    this.details = this.pubsub.getSubscriptionDetails(this.subscriptionPath!)
  }

  pullMessages(): void {
    console.log('trying to pull messages')

    this.pubsub.fetchMessages(this.subscriptionPath!, 10)
      .pipe(map(results => results.map(msg => {
        msg.message.data = this.convertMessageData(msg.message.data)
        return msg
      })))
      .subscribe(results => {
        this.messages = results
      })
  }

  convertMessageData(encodedInput: string) {
    const binaryString = atob(encodedInput);
    const uint8Array = new Uint8Array([...binaryString].map(char => char.charCodeAt(0)));
    const decoder = new TextDecoder();
    return decoder.decode(uint8Array);
  }

  printSomething(data: any) {
    console.log('called with', data)
  }

  async ackMessage(ackId: string) {
    const result = await firstValueFrom(this.pubsub.ackMessage(this.subscriptionPath!, [ackId]))
    console.log("result", result)

    if (Object.keys(result).length == 0) {  // a valid response will be no content
      this.messages = this.messages.filter(msg => msg.ackId != ackId)
    }
  }

}
