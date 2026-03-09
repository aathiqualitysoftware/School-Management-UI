import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFeeCollectionComponent } from './create-fee-collection.component';

describe('CreateFeeCollectionComponent', () => {
  let component: CreateFeeCollectionComponent;
  let fixture: ComponentFixture<CreateFeeCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFeeCollectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateFeeCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
