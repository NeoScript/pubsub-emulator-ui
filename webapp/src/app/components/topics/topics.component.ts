import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Topic, PubsubService } from '../../services/pubsub.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  topics: Topic[] = []

  constructor(private pubsub: PubsubService) { }
  
  ngOnInit(): void {
    this.fetchTopics()
  }

  async fetchTopics(){
    this.topics = await firstValueFrom(this.pubsub.listTopics())

    for await (const topic of this.topics){
      topic.subscriptions = await firstValueFrom(this.pubsub.listSubscriptionsOnTopic(topic.name))
    }
    console.log(this.topics)
  }

}
