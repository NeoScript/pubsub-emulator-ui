import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTopicDialogComponent } from './new-topic-dialog.component';

describe('NewTopicDialogComponent', () => {
  let component: NewTopicDialogComponent;
  let fixture: ComponentFixture<NewTopicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTopicDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTopicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
