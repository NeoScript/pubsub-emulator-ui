import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, map, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PubsubService {
  project_id = "test-project"
  public currentHost = "http://localhost:8681"

  private _projectList = new BehaviorSubject<string[]>(["test-project"])
  private _currentProject = new ReplaySubject<string>()
  private _currentTopic = new ReplaySubject<Topic>()
  private _currentSubscription = new ReplaySubject<Subscription>()

  public projectList$ = this._projectList.asObservable()
  public currentProject$ = this._currentProject.asObservable()
  public topicList$: Observable<Topic[]> = EMPTY
  public currentTopic$ = this._currentTopic.asObservable()
  public currentSubscription$ = this._currentSubscription.asObservable()

  constructor(private http: HttpClient) {

    this.currentProject$.subscribe(project =>
      this.topicList$ = this.listTopics(project)
    )
  }

  selectProject(projectId: string) {
    this._currentProject.next(projectId)
  }

  attachProject(newProject: string) {
    const newList = this._projectList.getValue()
    newList.push(newProject)

    this._projectList.next(newList)
  }

  listTopics(projectId: string = this.project_id) {
    return this.http.get<{ topics: Topic[] }>(`${this.currentHost}/v1/projects/${this.project_id}/topics`).pipe(map(incoming => incoming.topics))
  }
  listSubscriptionsOnTopic(topicPath: string) {
    console.log('looking up subscriptions on', topicPath)
    const url = `${this.currentHost}/v1/${topicPath}/subscriptions`
    console.log('request url', url)
    return this.http.get<{ subscriptions: Subscription[] }>(url).pipe(map(incoming => incoming.subscriptions))
  }
  listSubscriptions() {
    return this.http.get<{ subscriptions: string[] }>(`${this.currentHost}/v1/projects/${this.project_id}/subscriptions`)
      .pipe(
        map(incoming => incoming.subscriptions), // first we pull out the subscriptions object
        map(subNames => subNames.map(name => {name})) // now we convert each string to a Subscription object (idk why, I think just wanted to learn rxjs mapping...)
      )
  }

  fetchMessages(subPath: string, maxMessages: number) {
    return this.http
      .post<{ receivedMessages: ReceivedMessage[] }>(
        `${this.currentHost}/v1/${subPath}:pull`,
        { returnImmediately: true, maxMessages }
      ).pipe(map(incoming => incoming.receivedMessages ?? []))
  }
}

export interface Topic {
  name: string
  labels: { [key: string]: string }
  subscriptions?: string[]
}

export interface Subscription {
  name: string
  topic: string
}

export interface ReceivedMessage {
  ackId: string
  message: PubsubMessage
  deliveryAttempt: number
}

export interface PubsubMessage {
  data: string
  attributes: { [key: string]: string }
  messageId: string
  publishTime: string
  orderingKey: string
}