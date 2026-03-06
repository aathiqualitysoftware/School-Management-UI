import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuartersComponent } from './create-quarters.component';

describe('CreateQuartersComponent', () => {
  let component: CreateQuartersComponent;
  let fixture: ComponentFixture<CreateQuartersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateQuartersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateQuartersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
