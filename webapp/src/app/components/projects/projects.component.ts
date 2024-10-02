import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, tap } from 'rxjs';
import { PubsubMessage, PubsubService, Subscription, Topic } from 'src/app/services/pubsub.service';
import { NewSubscriptionRequest } from '../subscription-list/new-subscription-dialog/new-subscription-dialog.component';
import { NgClass, AsyncPipe } from '@angular/common';
import { TopicListComponent } from '../topic-list/topic-list.component';
import { SubscriptionListComponent } from '../subscription-list/subscription-list.component';
import { SubscriptionDetailsComponent } from '../subscription-details/subscription-details.component';
import { TopicDetailsComponent } from '../topic-details/topic-details.component';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
    standalone: true,
    imports: [TopicListComponent, SubscriptionListComponent, NgClass, SubscriptionDetailsComponent, TopicDetailsComponent, AsyncPipe]
})
export class ProjectsComponent implements OnInit {


  topicList$: Observable<Topic[]> = EMPTY
  topicList2$: Observable<Topic[]> = EMPTY
  subscriptionList$: Observable<Subscription[]> = EMPTY

  currentProject: string = ""
  currentTopic?: Topic
  currentSubscription?: Subscription

  constructor(private route: ActivatedRoute, private pubsub: PubsubService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(qpm => {
      this.currentProject = qpm.get("project") ?? ""

      console.log("loaded project: ", this.currentProject)
      this.pubsub.selectProject(this.currentProject!)
      this.topicList$ = this.pubsub.listTopics(this.currentProject).pipe(
        tap(topics => console.log("topics have loaded", topics))
      )
    })
  }

  loadSubsFor(topic: Topic) {
    console.log("load subs for", topic)
    this.currentSubscription = undefined
    this.subscriptionList$ = this.pubsub.listSubscriptionsOnTopic(topic.name)
  }

  handlePublishRequest(event: { topic: Topic, message: string }) {
    console.log("publish message request:", event.message)

    const pubsubMessage: PubsubMessage = {
      data: btoa(event.message)
    }

    this.pubsub.publishMessages(event.topic.name, [pubsubMessage]).subscribe(result => {
      console.log("published to ids", result.messageIds)
    })
  }

  handleNewTopicRequest(newTopic: string) {
    this.pubsub.createTopic(this.currentProject!, newTopic).subscribe(result => {
      console.log("pubsub response:")
      console.log(result)

      this.topicList$ = this.pubsub.listTopics(this.currentProject).pipe(
        tap(topics => console.log("topics have loaded", topics))
      )
    })
  }


  handleNewSubscription(request: NewSubscriptionRequest) {
    console.log("starting http", request)
    this.pubsub.createSubscription(this.currentProject!, request).subscribe(result => {
      console.log("sub created", request)
      this.loadSubsFor(this.currentTopic!)
    })
  }

}
