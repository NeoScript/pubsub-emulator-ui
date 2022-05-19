import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubscriptionDialogComponent } from './new-subscription-dialog.component';

describe('NewSubscriptionDialogComponent', () => {
  let component: NewSubscriptionDialogComponent;
  let fixture: ComponentFixture<NewSubscriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSubscriptionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSubscriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
