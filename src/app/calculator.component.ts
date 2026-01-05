import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnniversaryService, Anniversary } from './anniversary.service';

@Component({
  selector: 'app-calculator',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="calculator-container">
      <h1>Anniversary Calculator</h1>
      <p class="subtitle">Find something to celebrate every day!</p>
      
      <div class="input-section">
        <label for="dateInput">Choose a special date:</label>
        <input 
          type="date" 
          id="dateInput" 
          [(ngModel)]="selectedDate"
          (change)="onDateChange()"
          class="date-input"
        />
      </div>

      <div *ngIf="anniversaries.length > 0" class="results-section">
        <h2>Your Anniversaries</h2>
        
        <div class="filter-buttons">
          <button 
            [class.active]="filter === 'upcoming'" 
            (click)="setFilter('upcoming')"
            class="filter-btn"
          >
            Upcoming
          </button>
          <button 
            [class.active]="filter === 'past'" 
            (click)="setFilter('past')"
            class="filter-btn"
          >
            Past
          </button>
          <button 
            [class.active]="filter === 'all'" 
            (click)="setFilter('all')"
            class="filter-btn"
          >
            All
          </button>
        </div>

        <div class="anniversaries-list">
          <div 
            *ngFor="let anniversary of filteredAnniversaries" 
            class="anniversary-card"
            [class.upcoming]="anniversary.daysUntil > 0"
            [class.today]="anniversary.daysUntil === 0"
            [class.past]="anniversary.daysUntil < 0"
          >
            <div class="anniversary-name">{{ anniversary.name }}</div>
            <div class="anniversary-date">{{ formatDate(anniversary.date) }}</div>
            <div class="anniversary-countdown">
              <span *ngIf="anniversary.daysUntil > 0">In {{ anniversary.daysUntil }} days</span>
              <span *ngIf="anniversary.daysUntil === 0" class="today-badge">Today!</span>
              <span *ngIf="anniversary.daysUntil < 0">{{ Math.abs(anniversary.daysUntil) }} days ago</span>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="!selectedDate" class="empty-state">
        <p>Select a date above to see all your upcoming anniversaries!</p>
      </div>
    </div>
  `,
  styles: [`
    .calculator-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    h1 {
      color: #2c3e50;
      text-align: center;
      margin-bottom: 0.5rem;
      font-size: 2.5rem;
    }

    .subtitle {
      text-align: center;
      color: #7f8c8d;
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }

    .input-section {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #34495e;
      font-weight: 500;
    }

    .date-input {
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      transition: border-color 0.3s;
    }

    .date-input:focus {
      outline: none;
      border-color: #3498db;
    }

    .results-section {
      margin-top: 2rem;
    }

    h2 {
      color: #2c3e50;
      margin-bottom: 1rem;
      text-align: center;
    }

    .filter-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .filter-btn {
      padding: 0.5rem 1.5rem;
      border: 2px solid #3498db;
      background: white;
      color: #3498db;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s;
    }

    .filter-btn:hover {
      background: #ecf9ff;
    }

    .filter-btn.active {
      background: #3498db;
      color: white;
    }

    .anniversaries-list {
      display: grid;
      gap: 1rem;
    }

    .anniversary-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border-left: 4px solid #95a5a6;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .anniversary-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .anniversary-card.upcoming {
      border-left-color: #3498db;
    }

    .anniversary-card.today {
      border-left-color: #e74c3c;
      background: #fff5f5;
    }

    .anniversary-card.past {
      border-left-color: #95a5a6;
      opacity: 0.7;
    }

    .anniversary-name {
      font-size: 1.25rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .anniversary-date {
      color: #7f8c8d;
      margin-bottom: 0.5rem;
    }

    .anniversary-countdown {
      color: #3498db;
      font-weight: 500;
    }

    .today-badge {
      color: #e74c3c;
      font-weight: bold;
      font-size: 1.1rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #7f8c8d;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    @media (max-width: 600px) {
      .calculator-container {
        padding: 1rem;
      }

      h1 {
        font-size: 2rem;
      }

      .filter-buttons {
        flex-direction: column;
      }

      .filter-btn {
        width: 100%;
      }
    }
  `]
})
export class CalculatorComponent implements OnInit {
  selectedDate: string = '';
  anniversaries: Anniversary[] = [];
  filteredAnniversaries: Anniversary[] = [];
  filter: 'upcoming' | 'past' | 'all' = 'upcoming';
  Math = Math;

  constructor(
    private anniversaryService: AnniversaryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Check for date parameter in URL
    this.route.queryParams.subscribe(params => {
      const dateParam = params['date'];
      if (dateParam) {
        // Validate YYYY-MM-DD format
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (dateRegex.test(dateParam)) {
          this.selectedDate = dateParam;
          this.calculateAnniversaries();
        }
      }
    });
  }

  onDateChange() {
    if (this.selectedDate) {
      // Update URL with the new date
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { date: this.selectedDate },
        queryParamsHandling: 'merge'
      });
      this.calculateAnniversaries();
    }
  }

  calculateAnniversaries() {
    if (this.selectedDate) {
      const date = new Date(this.selectedDate + 'T00:00:00');
      this.anniversaries = this.anniversaryService.calculateAnniversaries(date);
      this.applyFilter();
    }
  }

  setFilter(filter: 'upcoming' | 'past' | 'all') {
    this.filter = filter;
    this.applyFilter();
  }

  applyFilter() {
    switch (this.filter) {
      case 'upcoming':
        this.filteredAnniversaries = this.anniversaries.filter(a => a.daysUntil >= 0);
        break;
      case 'past':
        this.filteredAnniversaries = this.anniversaries.filter(a => a.daysUntil < 0);
        break;
      case 'all':
        this.filteredAnniversaries = this.anniversaries;
        break;
    }
  }

  formatDate(date: Date): string {
    return this.anniversaryService.formatDate(date);
  }
}
