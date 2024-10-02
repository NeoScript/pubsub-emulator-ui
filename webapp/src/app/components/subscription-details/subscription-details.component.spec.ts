import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionDetailsComponent } from './subscription-details.component';


describe('SubscriptionDetailsComponent', () => {
  let component: SubscriptionDetailsComponent;
  let fixture: ComponentFixture<SubscriptionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [SubscriptionDetailsComponent],
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
