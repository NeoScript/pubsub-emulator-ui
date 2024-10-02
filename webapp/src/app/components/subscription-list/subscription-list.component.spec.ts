import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionListComponent } from './subscription-list.component';


describe('SubscriptionListComponent', () => {
  let component: SubscriptionListComponent;
  let fixture: ComponentFixture<SubscriptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SubscriptionListComponent],
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
