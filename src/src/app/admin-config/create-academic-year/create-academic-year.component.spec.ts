import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAcademicYearComponent } from './create-academic-year.component';

describe('CreateAcademicYearComponent', () => {
  let component: CreateAcademicYearComponent;
  let fixture: ComponentFixture<CreateAcademicYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAcademicYearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAcademicYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
