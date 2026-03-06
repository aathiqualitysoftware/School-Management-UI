import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassSectionComponent } from './create-class-section.component';

describe('CreateClassSectionComponent', () => {
  let component: CreateClassSectionComponent;
  let fixture: ComponentFixture<CreateClassSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateClassSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateClassSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
