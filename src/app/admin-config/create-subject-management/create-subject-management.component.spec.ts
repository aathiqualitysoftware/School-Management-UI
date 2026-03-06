import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubjectManagementComponent } from './create-subject-management.component';

describe('CreateSubjectManagementComponent', () => {
  let component: CreateSubjectManagementComponent;
  let fixture: ComponentFixture<CreateSubjectManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSubjectManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSubjectManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
