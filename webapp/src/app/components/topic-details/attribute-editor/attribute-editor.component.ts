import { KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput } from '@angular/material/input';

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
  public attributes: { [key: string]: string } = { ...inject(MAT_DIALOG_DATA).attributes }
  newKeyControl = new FormControl<string>("", Validators.required)
  newValueControl = new FormControl<string>("", Validators.required)
  jsonMode = false
  jsonInput = new FormControl<string>("")
  jsonError = false

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

  toggleJsonMode() {
    if (!this.jsonMode) {
      // Entering JSON mode: serialize current attributes
      this.jsonInput.setValue(JSON.stringify(this.attributes, null, 2))
      this.jsonError = false
      this.jsonMode = true
    } else {
      // Leaving JSON mode: try to parse
      if (this.applyJson()) {
        this.jsonMode = false
      }
    }
  }

  private applyJson(): boolean {
    try {
      const parsed = JSON.parse(this.jsonInput.value ?? '{}')
      if (typeof parsed !== 'object' || Array.isArray(parsed)) {
        this.jsonError = true
        return false
      }
      for (const val of Object.values(parsed)) {
        if (typeof val !== 'string') {
          this.jsonError = true
          return false
        }
      }
      this.attributes = parsed
      this.jsonError = false
      return true
    } catch {
      this.jsonError = true
      return false
    }
  }

  clearAll() {
    this.attributes = {}
    this.jsonInput.setValue('{}')
  }

  discardChanges() {
    this.dialogRef.close()
  }

  saveChanges() {
    if (this.jsonMode) {
      if (!this.applyJson()) return
    }
    this.dialogRef.close(this.attributes)
  }
}
