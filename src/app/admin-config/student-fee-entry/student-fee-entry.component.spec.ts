import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFeeEntryComponent } from './student-fee-entry.component';

describe('StudentFeeEntryComponent', () => {
  let component: StudentFeeEntryComponent;
  let fixture: ComponentFixture<StudentFeeEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentFeeEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentFeeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
