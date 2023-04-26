import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextOutputComponent } from './text-output.component';

describe('TextOutputComponent', () => {
  let component: TextOutputComponent;
  let fixture: ComponentFixture<TextOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextOutputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
