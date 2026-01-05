import { Injectable } from '@angular/core';

export interface Anniversary {
  name: string;
  date: Date;
  daysUntil: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnniversaryService {

  calculateAnniversaries(startDate: Date): Anniversary[] {
    const anniversaries: Anniversary[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Define anniversary milestones
    const milestones = [
      { days: 7, name: '1 Week' },
      { days: 14, name: '2 Weeks' },
      { days: 21, name: '3 Weeks' },
      { days: 30, name: '1 Month (30 days)' },
      { days: 50, name: '50 Days' },
      { days: 100, name: '100 Days' },
      { days: 365, name: '1 Year' },
      { days: 500, name: '500 Days' },
      { days: 730, name: '2 Years' },
      { days: 1000, name: '1000 Days' },
      { days: 1095, name: '3 Years' },
      { days: 1460, name: '4 Years' },
      { days: 1825, name: '5 Years' },
      { days: 2190, name: '6 Years' },
      { days: 2555, name: '7 Years' },
      { days: 2920, name: '8 Years' },
      { days: 3285, name: '9 Years' },
      { days: 3650, name: '10 Years' },
    ];

    // Add week milestones
    for (let weeks = 1; weeks <= 520; weeks++) { // Up to 10 years in weeks
      const days = weeks * 7;
      if (weeks === 10 || weeks === 25 || weeks === 50 || weeks === 75 || weeks === 100 || 
          weeks === 150 || weeks === 200 || weeks === 250 || weeks === 300 || 
          weeks === 350 || weeks === 400 || weeks === 450 || weeks === 500) {
        milestones.push({ days, name: `${weeks} Weeks` });
      }
    }

    // Calculate each anniversary
    milestones.forEach(milestone => {
      const anniversaryDate = new Date(startDate);
      anniversaryDate.setDate(anniversaryDate.getDate() + milestone.days);
      anniversaryDate.setHours(0, 0, 0, 0);

      const daysUntil = Math.ceil((anniversaryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      anniversaries.push({
        name: milestone.name,
        date: anniversaryDate,
        daysUntil: daysUntil
      });
    });

    // Sort by date
    anniversaries.sort((a, b) => a.date.getTime() - b.date.getTime());

    return anniversaries;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}
