import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFeesComponent } from './create-fees.component';

describe('CreateFeesComponent', () => {
  let component: CreateFeesComponent;
  let fixture: ComponentFixture<CreateFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
