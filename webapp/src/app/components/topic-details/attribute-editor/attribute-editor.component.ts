import { KeyValuePipe } from '@angular/common';
import { Component, ComponentFactoryResolver, inject, input, signal, Signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatList, MatListItem, MatListItemIcon } from '@angular/material/list';

@Component({
  selector: 'app-attribute-editor',
  standalone: true,
  imports: [
    MatButton,
    MatDialogContent,
    MatDialogActions,
    KeyValuePipe,
    MatIcon,
    MatIconButton,
    MatInput,
    MatFormField,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './attribute-editor.component.html',
  styleUrl: './attribute-editor.component.scss'
})
export class AttributeEditorComponent {
  public attributes: { [key: string]: string } = inject(MAT_DIALOG_DATA).attributes
  newKeyControl = new FormControl<string>("", Validators.required)
  newValueControl = new FormControl<string>("", Validators.required)

  constructor(
    private dialogRef: MatDialogRef<AttributeEditorComponent>
  ) { }

  deleteAttribute(key: string) {
    delete this.attributes[key]
  }

  addAttribute() {
    if (this.newKeyControl.valid && this.newValueControl.valid) {
      const key = this.newKeyControl.value
      const value = this.newValueControl.value

      this.attributes[key!] = value!

      this.newKeyControl.reset()
      this.newValueControl.reset()
    }
  }

  discardChanges() {
    this.dialogRef.close()
  }

  saveChanges() {
    this.dialogRef.close(this.attributes)
  }
}
