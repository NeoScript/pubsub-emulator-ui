import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { firstValueFrom } from 'rxjs';
import { Topic } from 'src/app/services/pubsub.service';
import { NewTopicDialogComponent } from './new-topic-dialog/new-topic-dialog.component';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {

  @Input() topics: Topic[] = []
  
  @Input() currentTopic?: Topic
  @Output() currentTopicChange = new EventEmitter<Topic>()
  @Output() newTopicRequest = new EventEmitter<string>()
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  selectTopic(topic: Topic){
    this.currentTopic = topic
    this.currentTopicChange.emit(topic)
  }

  async createNewTopic(){
    const ref = this.dialog.open(NewTopicDialogComponent)

    const result = await firstValueFrom<{newTopic: string}>(ref.afterClosed())
    console.log("new topic returned", result?.newTopic)

    if(result?.newTopic){
      this.newTopicRequest.emit(result?.newTopic)
    }
  }

}
