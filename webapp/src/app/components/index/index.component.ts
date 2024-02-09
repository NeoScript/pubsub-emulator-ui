import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, filter } from 'rxjs';
import { PubsubService } from 'src/app/services/pubsub.service';
import { InputDialogComponent } from '../input-dialog/input-dialog.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  projectList$: Observable<string[]>

  constructor(private pubsub: PubsubService, private matDialog: MatDialog) {
    this.projectList$ = pubsub.projectList$
  }

  ngOnInit(): void {
  }

  addNewProject() {
    const ref = this.matDialog.open(InputDialogComponent)

    ref.afterClosed()
      .pipe(filter(r => !!r))
      .subscribe((result: { user_input: string }) => {
        console.log(result)
        this.pubsub.attachProject(result.user_input)
      })
  }

}
