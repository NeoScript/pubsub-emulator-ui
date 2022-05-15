import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PubsubService, Topic } from 'src/app/services/pubsub.service';
@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {

  @Input() topics: Topic[] = []
  
  @Input() currentTopic?: Topic
  @Output() currentTopicChange = new EventEmitter<Topic>()
  constructor() { }

  ngOnInit(): void {
  }

  selectTopic(topic: Topic){
    this.currentTopic = topic
    this.currentTopicChange.emit(topic)
  }

}
