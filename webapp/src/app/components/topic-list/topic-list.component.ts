import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { Topic } from 'src/app/services/pubsub.service';
import { NewTopicDialogComponent } from './new-topic-dialog/new-topic-dialog.component';
import { MatActionList, MatListItem } from '@angular/material/list';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-topic-list',
    templateUrl: './topic-list.component.html',
    styleUrls: ['./topic-list.component.scss'],
    standalone: true,
    imports: [MatActionList, MatListItem, NgClass, MatIcon]
})
export class TopicListComponent implements OnInit {
  private dialog = inject(MatDialog);


  @Input() topics: Topic[] = []
  
  @Input() currentTopic?: Topic
  @Output() currentTopicChange = new EventEmitter<Topic>()
  @Output() newTopicRequest = new EventEmitter<string>()

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
