import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PubsubService, ReceivedMessage } from 'src/app/services/pubsub.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  subPath = ''
  messages: ReceivedMessage[] = []
  constructor(private route: ActivatedRoute, private pubsub: PubsubService) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParamMap => {
      this.subPath = queryParamMap.get('subscriptionId') ?? ''

      this.pullMessages()
    })
  }

  pullMessages(): void {
    console.log("messages loading")
    this.pubsub.fetchMessages(this.subPath, 10).subscribe(messages => {
      console.log("messages recieved", messages)
      this.messages = messages

      this.messages.forEach(message =>{
        const messageData = atob(message.message.data)
        console.log(messageData)
      })
    })
  }

}
