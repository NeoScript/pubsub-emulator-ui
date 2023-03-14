import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, map, Observable, ReplaySubject } from 'rxjs';
import { NewSubscriptionRequest } from '../components/subscription-list/new-subscription-dialog/new-subscription-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class PubsubService {
  public project_id = ""
  public currentHost = "__EMULATOR_HOST_PROXY_URL__";

  private _projectList = new BehaviorSubject<string[]>([])
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
    this.project_id = projectId
    this._currentProject.next(projectId)
  }

  attachProject(newProject: string) {
    const newList = this._projectList.getValue()
    newList.push(newProject)

    this._projectList.next(newList)
  }

  createTopic(projectId: string = this.project_id, topicId: string) {
    const url = `${this.currentHost}/v1/projects/${projectId}/topics/${topicId}`

    return this.http.put<Topic>(url, {})
  }

  listTopics(projectId: string = this.project_id) {
    return this.http.get<{ topics: Topic[] }>(`${this.currentHost}/v1/projects/${this.project_id}/topics`).pipe(map(incoming => incoming?.topics || []))
  }

  createSubscription(projectId: string, request: NewSubscriptionRequest) {
    const url = `${this.currentHost}/v1/projects/${projectId}/subscriptions/${request.name}`

    return this.http.put<Subscription>(url, { topic: request.topic, pushConfig: request.pushConfig })
  }

  deleteSubscription(subscriptionPath: string) {
    const url = `${this.currentHost}/v1/${subscriptionPath}`
    return this.http.delete(url)
  }

  listSubscriptions(): Observable<Subscription[]> {
    return this.http.get<{ subscriptions?: string[] }>(`${this.currentHost}/v1/projects/${this.project_id}/subscriptions`)
      .pipe(
        map(incoming => incoming.subscriptions), // first we pull out the subscriptions object
        map(subNames => subNames ?? []),
        map(subNames => subNames.map(name => ({ name, topic: 'undefined' } as Subscription))) // now we convert each string to a Subscription object (idk why, I think just wanted to learn rxjs mapping...)
      )
  }

  listSubscriptionsOnTopic(topicPath: string): Observable<Subscription[]> {
    console.log('looking up subscriptions on', topicPath)
    const url = `${this.currentHost}/v1/${topicPath}/subscriptions`
    console.log('request url', url)
    return this.http.get<{ subscriptions?: string[] }>(url)
      .pipe(
        map(incoming => incoming.subscriptions),
        map(subNames => subNames ?? []),
        map(subNames => subNames.map(name => ({ name, topic: 'undefined' } as Subscription))) // now we convert each string to a Subscription object (idk why, I think just wanted to learn rxjs mapping...)
      )
  }

  getSubscriptionDetails(subscriptionPath: string) {
    const url = `${this.currentHost}/v1/${subscriptionPath}`
    return this.http.get<Subscription>(url)
  }

  fetchMessages(subPath: string, maxMessages: number) {
    return this.http
      .post<{ receivedMessages: ReceivedMessage[] }>(
        `${this.currentHost}/v1/${subPath}:pull`,
        { returnImmediately: true, maxMessages }
      ).pipe(map(incoming => incoming.receivedMessages ?? []))
  }

  ackMessage(subscriptionPath: string, ackIds: string[]) {
    const url = `${this.currentHost}/v1/${subscriptionPath}:acknowledge`
    return this.http.post(url, { ackIds })
  }

  publishMessages(topicPath: string, messages: PubsubMessage[]) {
    const url = `${this.currentHost}/v1/${topicPath}:publish`
    return this.http.post<{ messageIds: string[] }>(url, { messages })
  }
}

export interface Topic {
  name: string
  labels: { [key: string]: string }
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
  attributes?: { [key: string]: string }
  messageId?: string
  publishTime?: string
  orderingKey?: string
}

export interface PushConfig {
  pushEndpoint: string
  attributes?: { [key: string]: string }
}
