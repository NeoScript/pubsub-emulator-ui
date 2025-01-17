import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Topic } from 'src/app/services/pubsub.service';
import { AttributeEditorComponent } from './attribute-editor/attribute-editor.component';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
  standalone: true,
  imports: [MatButton, MatIcon, MatFormField, MatInput, CdkTextareaAutosize, ReactiveFormsModule]
})
export class TopicDetailsComponent implements OnInit {

  @Input() topic?: Topic
  @Output() onMessagePublish = new EventEmitter<{ topic: Topic, message: string, attributes: { [key: string]: string } }>()

  _dialog = inject(MatDialog)
  public inputField = new UntypedFormControl('', Validators.required)
  attributes: { [key: string]: string } = {}
  attributeCount = 0
  constructor() { }

  ngOnInit(): void {
  }

  editAttributes() {
    let dialogRef = this._dialog.open(AttributeEditorComponent, { data: { attributes: this.attributes } })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.attributes = result
        this.attributeCount = Object.keys(this.attributes).length
      }
    })
  }

  publishMessage() {
    console.log("this value was found", this.inputField.value)

    this.onMessagePublish.emit({ topic: this.topic!, message: this.inputField.value, attributes: this.attributes })
    this.inputField.reset()
    this.attributes = {}
    this.attributeCount = 0
  }

}
