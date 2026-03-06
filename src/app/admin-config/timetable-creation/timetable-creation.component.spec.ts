import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableCreationComponent } from './timetable-creation.component';

describe('TimetableCreationComponent', () => {
  let component: TimetableCreationComponent;
  let fixture: ComponentFixture<TimetableCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimetableCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimetableCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
