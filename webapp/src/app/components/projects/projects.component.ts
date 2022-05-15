import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PubsubService } from 'src/app/services/pubsub.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  currentProject: string = ''
  constructor(private route: ActivatedRoute, private pubsub: PubsubService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(qpm => {
      this.currentProject = qpm.get("project") ?? ''

      console.log("loaded project: ", this.currentProject)
    })
  }

}
