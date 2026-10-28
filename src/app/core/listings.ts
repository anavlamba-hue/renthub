import { Injectable } from '@angular/core';

export interface PropertyListing {
  id: number;
  buildingType: string;
  buildingName: string;
  isShared: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  streetAddress: string;
  city: string;
  area: number;
  lease: string;
  rent: number;
  negotiable: boolean;
  priceMode: string;
  utilitiesIncluded: boolean;
  furnished: string;
  amenities: string[];
  vegetarianPreference: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  beds: number;
  baths: number;
}

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  private readonly storageKey = 'renthub_listings';

  getListings(): PropertyListing[] {
    try {
      const saved = localStorage.getItem(this.storageKey);

      if (!saved) {
        return [];
      }

      const parsed: unknown = JSON.parse(saved);

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed as PropertyListing[];
    } catch {
      return [];
    }
  }

  addListing(listing: Omit<PropertyListing, 'id'>): PropertyListing {
    const listings = this.getListings();

    const newListing: PropertyListing = {
      ...listing,
      id: Date.now(),
    };

    listings.push(newListing);
    localStorage.setItem(this.storageKey, JSON.stringify(listings));

    return newListing;
  }

  getListingById(id: number): PropertyListing | undefined {
    return this.getListings().find((listing) => listing.id === id);
  }
}
