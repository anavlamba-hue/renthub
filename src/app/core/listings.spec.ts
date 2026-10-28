import { TestBed } from '@angular/core/testing';
import { ListingsService } from './listings';

describe('ListingsService', () => {
  let service: ListingsService;

  beforeEach(() => {
    localStorage.removeItem('renthub_listings');

    TestBed.configureTestingModule({});
    service = TestBed.inject(ListingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save a listing and retrieve it by ID', () => {
    const listing = service.addListing({
      buildingType: 'Apartment',
      buildingName: 'Test Heights',
      isShared: 'No',
      contactName: 'Test User',
      contactEmail: 'test@example.com',
      contactPhone: '9999999999',
      streetAddress: 'Test Street',
      city: 'Jaipur',
      area: 1000,
      lease: '11 months',
      rent: 25000,
      negotiable: false,
      priceMode: 'Monthly',
      utilitiesIncluded: false,
      furnished: 'Fully furnished',
      amenities: ['Parking'],
      vegetarianPreference: 'No preference',
      title: 'Test Apartment',
      description: 'A test property',
      image: 'test-image.jpg',
      tag: 'New',
      beds: 2,
      baths: 1,
    });

    expect(listing.id).toBeTruthy();
    expect(service.getListingById(listing.id)).toEqual(listing);
    expect(service.getListings().length).toBe(1);
  });
});
