import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeEditorComponent } from './attribute-editor.component';

describe('AttributeEditorComponent', () => {
  let component: AttributeEditorComponent;
  let fixture: ComponentFixture<AttributeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
