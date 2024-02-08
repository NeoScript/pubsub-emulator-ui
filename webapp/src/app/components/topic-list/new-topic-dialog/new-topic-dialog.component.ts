import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-topic-dialog',
  templateUrl: './new-topic-dialog.component.html',
  styleUrls: ['./new-topic-dialog.component.scss']
})
export class NewTopicDialogComponent implements OnInit {

  topicName = new UntypedFormControl('', Validators.required)
  constructor(private ref: MatDialogRef<NewTopicDialogComponent>) { }

  ngOnInit(): void {
  }

  submit(): void{
    if(this.topicName.valid){
      this.ref.close({newTopic: this.topicName.value})
    }
  }

}
