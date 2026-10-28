import { TestBed } from '@angular/core/testing';
import { EnquiriesService } from './enquiries';

describe('EnquiriesService', () => {
  let service: EnquiriesService;

  beforeEach(() => {
    localStorage.removeItem('renthub_enquiries');

    TestBed.configureTestingModule({});
    service = TestBed.inject(EnquiriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and retrieve an enquiry', () => {
    const enquiry = service.addEnquiry({
      propertyId: 1,
      propertyTitle: 'Test Apartment',
      userName: 'Test User',
      userEmail: 'test@example.com',
    });

    expect(enquiry.id).toBeTruthy();
    expect(enquiry.createdAt).toBeTruthy();
    expect(service.getEnquiries()).toEqual([enquiry]);
  });
});
