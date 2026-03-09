import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudentFeeEntryComponent } from './create-student-fee-entry.component';

describe('CreateStudentFeeEntryComponent', () => {
  let component: CreateStudentFeeEntryComponent;
  let fixture: ComponentFixture<CreateStudentFeeEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStudentFeeEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateStudentFeeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
