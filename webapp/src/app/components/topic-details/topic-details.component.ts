import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Topic } from 'src/app/services/pubsub.service';
import { AttributeEditorComponent } from './attribute-editor/attribute-editor.component';

function attributesStorageKey(topicName: string): string {
  return `message-attributes:${topicName}`
}

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
  standalone: true,
  imports: [MatButton, MatIcon, MatFormField, MatInput, CdkTextareaAutosize, ReactiveFormsModule]
})
export class TopicDetailsComponent implements OnInit, OnChanges {

  @Input() topic?: Topic
  @Output() onMessagePublish = new EventEmitter<{ topic: Topic, message: string, attributes: { [key: string]: string } }>()

  _dialog = inject(MatDialog)
  public inputField = new UntypedFormControl('', Validators.required)
  attributes: { [key: string]: string } = {}
  attributeCount = 0
  constructor() { }

  ngOnInit(): void {
    this.loadAttributes()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['topic'] && !changes['topic'].firstChange) {
      this.loadAttributes()
    }
  }

  private loadAttributes(): void {
    this.attributes = {}
    this.attributeCount = 0
    if (!this.topic) return
    const stored = localStorage.getItem(attributesStorageKey(this.topic.name))
    if (stored) {
      try {
        this.attributes = JSON.parse(stored)
        this.attributeCount = Object.keys(this.attributes).length
      } catch (e) {
        console.error('Failed to parse stored attributes for topic', this.topic?.name, e)
      }
    }
  }

  editAttributes() {
    let dialogRef = this._dialog.open(AttributeEditorComponent, { data: { attributes: { ...this.attributes } } })

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.attributes = result
        this.attributeCount = Object.keys(this.attributes).length
        localStorage.setItem(attributesStorageKey(this.topic!.name), JSON.stringify(this.attributes))
      }
    })
  }

  clearAttributes() {
    this.attributes = {}
    this.attributeCount = 0
    localStorage.removeItem(attributesStorageKey(this.topic!.name))
  }

  publishMessage() {
    console.log("this value was found", this.inputField.value)
    this.onMessagePublish.emit({ topic: this.topic!, message: this.inputField.value, attributes: this.attributes })
    this.inputField.reset()
  }

}
