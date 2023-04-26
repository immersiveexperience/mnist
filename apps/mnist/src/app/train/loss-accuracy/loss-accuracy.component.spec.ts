import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LossAccuracyComponent } from './loss-accuracy.component';

describe('LossAccuracyComponent', () => {
  let component: LossAccuracyComponent;
  let fixture: ComponentFixture<LossAccuracyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LossAccuracyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LossAccuracyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
