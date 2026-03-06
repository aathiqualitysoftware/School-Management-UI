import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuatersExamTypeComponent } from './quaters-exam-type.component';

describe('QuatersExamTypeComponent', () => {
  let component: QuatersExamTypeComponent;
  let fixture: ComponentFixture<QuatersExamTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuatersExamTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuatersExamTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
