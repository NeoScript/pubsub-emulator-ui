import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PubsubService {
  project_id = "test-project"
  port = 8681
  constructor(private http: HttpClient) { }

  listTopics(){
    return this.http.get<{topics: Topic[]}>(`http://localhost:${this.port}/v1/projects/${this.project_id}/topics`).pipe(map(incoming => incoming.topics))
  }
}

export interface Topic{
  name: string
  labels: {[key:string]: string}
}

