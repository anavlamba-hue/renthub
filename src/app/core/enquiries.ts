import { Injectable } from '@angular/core';

export interface PropertyEnquiry {
  id: string;
  propertyId: number;
  propertyTitle: string;
  userName: string;
  userEmail: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class EnquiriesService {
  private readonly storageKey = 'renthub_enquiries';

  getEnquiries(): PropertyEnquiry[] {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? (JSON.parse(saved) as PropertyEnquiry[]) : [];
    } catch {
      return [];
    }
  }

  addEnquiry(enquiry: Omit<PropertyEnquiry, 'id' | 'createdAt'>): PropertyEnquiry {
    const newEnquiry: PropertyEnquiry = {
      ...enquiry,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
    };

    const enquiries = this.getEnquiries();
    enquiries.push(newEnquiry);

    localStorage.setItem(this.storageKey, JSON.stringify(enquiries));

    return newEnquiry;
  }
}
