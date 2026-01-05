import { TestBed } from '@angular/core/testing';
import { AnniversaryService } from './anniversary.service';

describe('AnniversaryService', () => {
  let service: AnniversaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnniversaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate anniversaries for a given date', () => {
    const startDate = new Date('2020-01-15');
    const anniversaries = service.calculateAnniversaries(startDate);
    expect(anniversaries.length).toBeGreaterThan(0);
  });

  it('should include 1 week anniversary', () => {
    const startDate = new Date('2020-01-15');
    const anniversaries = service.calculateAnniversaries(startDate);
    const oneWeek = anniversaries.find(a => a.name === '1 Week');
    expect(oneWeek).toBeTruthy();
  });

  it('should include 100 days anniversary', () => {
    const startDate = new Date('2020-01-15');
    const anniversaries = service.calculateAnniversaries(startDate);
    const hundredDays = anniversaries.find(a => a.name === '100 Days');
    expect(hundredDays).toBeTruthy();
  });

  it('should include 1 year anniversary', () => {
    const startDate = new Date('2020-01-15');
    const anniversaries = service.calculateAnniversaries(startDate);
    const oneYear = anniversaries.find(a => a.name === '1 Year');
    expect(oneYear).toBeTruthy();
  });

  it('should include 5 years anniversary', () => {
    const startDate = new Date('2020-01-15');
    const anniversaries = service.calculateAnniversaries(startDate);
    const fiveYears = anniversaries.find(a => a.name === '5 Years');
    expect(fiveYears).toBeTruthy();
  });

  it('should sort anniversaries by date', () => {
    const startDate = new Date('2020-01-15');
    const anniversaries = service.calculateAnniversaries(startDate);
    for (let i = 0; i < anniversaries.length - 1; i++) {
      expect(anniversaries[i].date.getTime()).toBeLessThanOrEqual(anniversaries[i + 1].date.getTime());
    }
  });

  it('should format date correctly', () => {
    const date = new Date('2020-01-15');
    const formatted = service.formatDate(date);
    expect(formatted).toBe('January 15, 2020');
  });

  it('should calculate correct days until anniversary', () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 6); // 6 days ago
    
    const anniversaries = service.calculateAnniversaries(startDate);
    const oneWeek = anniversaries.find(a => a.name === '1 Week');
    expect(oneWeek?.daysUntil).toBe(1); // Should be tomorrow
  });
});
