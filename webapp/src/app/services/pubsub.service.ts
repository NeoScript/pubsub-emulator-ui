import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, EMPTY, map, Observable, ReplaySubject } from 'rxjs';
import { NewSubscriptionRequest } from '../components/subscription-list/new-subscription-dialog/new-subscription-dialog.component';

// Declare window.APP_CONFIG for runtime configuration
declare global {
  interface Window {
    APP_CONFIG?: {
      autoAttachPubsubProjects?: string;
      defaultPubsubEmulatorHost?: string;
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class PubsubService {
  private http = inject(HttpClient);

  public _currentHost$ = new BehaviorSubject<string>("")

  private _projectList = new BehaviorSubject<string[]>([])
  private _currentProject = new ReplaySubject<string>()
  private _currentTopic = new ReplaySubject<Topic>()
  private _currentSubscription = new ReplaySubject<Subscription>()

  public projectList$ = this._projectList.asObservable()
  public currentProject$ = this._currentProject.asObservable()
  public topicList$: Observable<Topic[]> = EMPTY
  public currentTopic$ = this._currentTopic.asObservable()
  public currentSubscription$ = this._currentSubscription.asObservable()

  constructor() {
    let defaultHost = window.APP_CONFIG?.defaultPubsubEmulatorHost || ""
    if (!defaultHost || defaultHost === '${DEFAULT_PUBSUB_EMULATOR_HOST}') {
      defaultHost = "http://localhost:8681"
    }

    if (!defaultHost.match(/^http[s]?:\/\//)) {
      defaultHost = `http://${defaultHost}`
    }

    const prevHost = localStorage.getItem("host")
    if (prevHost) {
      console.log('loaded previous host', prevHost)
      this._currentHost$.next(prevHost)
    } else {
      console.log('loaded default host', defaultHost)
      this._currentHost$.next(defaultHost)
    }

    const prevProjects = localStorage.getItem("projects") ?? "[]"
    const projects: string[] = JSON.parse(prevProjects) ?? []

    // Auto-attach projects from environment variable (idempotent)
    const autoAttachProjects = this.getAutoAttachProjects()
    const mergedProjects = this.mergeProjectsIdempotently(projects, autoAttachProjects)

    this._projectList.next(mergedProjects)

    // Save merged list to localStorage if auto-attach added new projects
    if (mergedProjects.length !== projects.length) {
      localStorage.setItem("projects", JSON.stringify(mergedProjects))
      console.log('auto-attached projects:', autoAttachProjects)
    }

    this.currentProject$.subscribe(project =>
      this.topicList$ = this.listTopics(project)
    )
  }

  private getAutoAttachProjects(): string[] {
    const autoAttachProjects = window.APP_CONFIG?.autoAttachPubsubProjects || ''
    if (!autoAttachProjects || autoAttachProjects === "${AUTO_ATTACH_PUBSUB_PROJECTS}") {
      return []
    }

    return autoAttachProjects
      .split(',')
      .map(project => project.trim())
      .filter(project => project.length > 0)
  }

  private mergeProjectsIdempotently(existing: string[], autoAttach: string[]): string[] {
    const merged = [...existing]

    for (const project of autoAttach) {
      if (!merged.includes(project)) {
        merged.push(project)
      }
    }

    return merged
  }

  setHost(hostUrl: string) {
    this._currentHost$.next(hostUrl)

    localStorage.setItem("host", hostUrl)
  }

  selectProject(projectId: string) {
    this._currentProject.next(projectId)
  }

  attachProject(newProject: string) {
    const newList = this._projectList.getValue()
    newList.push(newProject)

    this._projectList.next(newList)

    const jsonList = JSON.stringify(newList)
    localStorage.setItem("projects", jsonList)
  }

  createTopic(projectId: string, topicId: string) {
    const url = `${this._currentHost$.value}/v1/projects/${projectId}/topics/${topicId}`

    return this.http.put<Topic>(url, {})
  }

  listTopics(projectId: string) {
    return this.http.get<{ topics: Topic[] }>(`${this._currentHost$.value}/v1/projects/${projectId}/topics`).pipe(map(incoming => incoming?.topics || []))
  }

  createSubscription(projectId: string, request: NewSubscriptionRequest) {
    const url = `${this._currentHost$.value}/v1/projects/${projectId}/subscriptions/${request.name}`

    return this.http.put<Subscription>(url, { topic: request.topic, pushConfig: request.pushConfig })
  }

  deleteSubscription(subscriptionPath: string) {
    const url = `${this._currentHost$.value}/v1/${subscriptionPath}`
    return this.http.delete(url)
  }

  listSubscriptions(projectId: string): Observable<Subscription[]> {
    return this.http.get<{ subscriptions?: string[] }>(`${this._currentHost$.value}/v1/projects/${projectId}/subscriptions`)
      .pipe(
        map(incoming => incoming.subscriptions), // first we pull out the subscriptions object
        map(subNames => subNames ?? []),
        map(subNames => subNames.map(name => ({ name, topic: 'undefined' } as Subscription))) // now we convert each string to a Subscription object (idk why, I think just wanted to learn rxjs mapping...)
      )
  }

  listSubscriptionsOnTopic(topicPath: string): Observable<Subscription[]> {
    console.log('looking up subscriptions on', topicPath)
    const url = `${this._currentHost$.value}/v1/${topicPath}/subscriptions`
    console.log('request url', url)
    return this.http.get<{ subscriptions?: string[] }>(url)
      .pipe(
        map(incoming => incoming.subscriptions),
        map(subNames => subNames ?? []),
        map(subNames => subNames.map(name => ({ name, topic: 'undefined' } as Subscription))) // now we convert each string to a Subscription object (idk why, I think just wanted to learn rxjs mapping...)
      )
  }

  getSubscriptionDetails(subscriptionPath: string) {
    const url = `${this._currentHost$.value}/v1/${subscriptionPath}`
    return this.http.get<Subscription>(url)
  }

  fetchMessages(subPath: string, maxMessages: number) {
    return this.http
      .post<{ receivedMessages: ReceivedMessage[] }>(
        `${this._currentHost$.value}/v1/${subPath}:pull`,
        { returnImmediately: true, maxMessages }
      ).pipe(map(incoming => incoming.receivedMessages ?? []))
  }

  ackMessage(subscriptionPath: string, ackIds: string[]) {
    const url = `${this._currentHost$.value}/v1/${subscriptionPath}:acknowledge`
    return this.http.post(url, { ackIds })
  }

  publishMessages(topicPath: string, messages: PubsubMessage[]) {
    const url = `${this._currentHost$.value}/v1/${topicPath}:publish`
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
