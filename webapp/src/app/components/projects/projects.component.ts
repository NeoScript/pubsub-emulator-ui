import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, firstValueFrom, Observable, of, switchMap } from 'rxjs';
import { PubsubService, Topic } from 'src/app/services/pubsub.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  currentProject: string = ''

  topicList$: Observable<Topic[]> = EMPTY

  currentTopic?: Topic
  constructor(private route: ActivatedRoute, private pubsub: PubsubService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(qpm => {
      this.currentProject = qpm.get("project") ?? ''

      console.log("loaded project: ", this.currentProject)
      this.pubsub.listTopics(this.currentProject)
        .pipe(
          switchMap(async topicList => {
            for await (const topic of topicList) {
              topic.subscriptions = await firstValueFrom(this.pubsub.listSubscriptionsOnTopic(topic.name))
              console.log(topic.subscriptions)
            }

            console.log(topicList)
            return of(topicList)
          }))
        .subscribe(result => {
          this.topicList$ = result
        })
    })
  }


  selectTopic(topic: Topic) {
    this.currentTopic = topic
  }

}
