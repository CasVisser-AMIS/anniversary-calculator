import { TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { provideRouter } from '@angular/router';
import { AnniversaryService } from './anniversary.service';

describe('CalculatorComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        AnniversaryService,
        provideRouter([])
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Anniversary Calculator');
  });

  it('should have empty selectedDate initially', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    const component = fixture.componentInstance;
    expect(component.selectedDate).toBe('');
  });

  it('should calculate anniversaries when date is selected', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    const component = fixture.componentInstance;
    component.selectedDate = '2020-01-15';
    component.calculateAnniversaries();
    expect(component.anniversaries.length).toBeGreaterThan(0);
  });

  it('should filter upcoming anniversaries', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    const component = fixture.componentInstance;
    component.selectedDate = '2020-01-15';
    component.calculateAnniversaries();
    component.setFilter('upcoming');
    const hasUpcoming = component.filteredAnniversaries.every(a => a.daysUntil >= 0);
    expect(hasUpcoming).toBe(true);
  });

  it('should filter past anniversaries', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    const component = fixture.componentInstance;
    component.selectedDate = '2020-01-15';
    component.calculateAnniversaries();
    component.setFilter('past');
    const hasPast = component.filteredAnniversaries.every(a => a.daysUntil < 0);
    expect(hasPast).toBe(true);
  });
});
