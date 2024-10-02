import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-new-topic-dialog',
    templateUrl: './new-topic-dialog.component.html',
    styleUrls: ['./new-topic-dialog.component.scss'],
    standalone: true,
    imports: [MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatFormField, MatInput, ReactiveFormsModule, MatButton]
})
export class NewTopicDialogComponent implements OnInit {
  private ref = inject<MatDialogRef<NewTopicDialogComponent>>(MatDialogRef);


  topicName = new UntypedFormControl('', Validators.required)

  ngOnInit(): void {
  }

  submit(): void{
    if(this.topicName.valid){
      this.ref.close({newTopic: this.topicName.value})
    }
  }

}
