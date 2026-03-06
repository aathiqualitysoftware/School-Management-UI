import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMasterTypeComponent } from './create-master-type.component';

describe('CreateMasterTypeComponent', () => {
  let component: CreateMasterTypeComponent;
  let fixture: ComponentFixture<CreateMasterTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMasterTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMasterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
