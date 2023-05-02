import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMaterialCheckboxComponent } from './angular-material-checkbox.component';

describe('AngularMaterialCheckboxComponent', () => {
  let component: AngularMaterialCheckboxComponent;
  let fixture: ComponentFixture<AngularMaterialCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularMaterialCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularMaterialCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
