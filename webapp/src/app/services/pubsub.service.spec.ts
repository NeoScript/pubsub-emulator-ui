import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { PubsubService } from './pubsub.service';


describe('PubsubService', () => {
  let service: PubsubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi())]
});
    service = TestBed.inject(PubsubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
