import { Component, Input, OnInit } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { PubsubService, ReceivedMessage, Subscription } from 'src/app/services/pubsub.service';

@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.scss']
})
export class SubscriptionDetailsComponent implements OnInit {

  @Input() subscriptionPath?: string

  details: Observable<Subscription> = EMPTY
  messages: ReceivedMessage[] = []

  constructor(private pubsub: PubsubService) { }

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

  convertMessageData(b64data: string) {
    console.log('doing translation on ', b64data)
    const result = atob(b64data)
    console.log(b64data, " -> ", result)
    return result
  }

  printSomething(data: any) {
    console.log('called with', data)
  }

}
