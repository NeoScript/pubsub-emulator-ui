import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, tap } from 'rxjs';
import { PubsubService, Subscription, Topic } from 'src/app/services/pubsub.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {


  topicList$: Observable<Topic[]> = EMPTY
  topicList2$: Observable<Topic[]> = EMPTY
  subscriptionList$: Observable<Subscription[]> = EMPTY

  currentProject?: string
  currentTopic?: Topic
  currentSubscription?: Subscription

  constructor(private route: ActivatedRoute, private pubsub: PubsubService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(qpm => {
      this.currentProject = qpm.get("project") ?? undefined

      console.log("loaded project: ", this.currentProject)
      this.pubsub.selectProject(this.currentProject!)
      this.topicList$ = this.pubsub.listTopics(this.currentProject).pipe(
        tap(topics => console.log("topics have loaded", topics))
      )
    })
  }

  loadSubsFor(topic: Topic){
    console.log("load subs for", topic)
    this.currentSubscription = undefined
    this.subscriptionList$ = this.pubsub.listSubscriptionsOnTopic(topic.name)
  }

  handlePublishRequest(message: string){
    console.log("publish message request:", message)
  }

}
