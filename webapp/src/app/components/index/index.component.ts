import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, filter } from 'rxjs';
import { PubsubService } from 'src/app/services/pubsub.service';
import { InputDialogComponent } from '../input-dialog/input-dialog.component';
import { AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
    standalone: true,
    imports: [MatButton, RouterLink, MatIcon, AsyncPipe]
})
export class IndexComponent implements OnInit {
  private pubsub = inject(PubsubService);
  private matDialog = inject(MatDialog);


  projectList$: Observable<string[]>

  constructor() {
    const pubsub = this.pubsub;

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
