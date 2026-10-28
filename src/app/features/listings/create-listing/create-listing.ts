import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ListingsService } from '../../../core/listings';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-create-listing',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './create-listing.html',
  styleUrl: './create-listing.scss',
})
export class CreateListing {
  submitted = false;
  submitError = '';
  submitSuccess = '';
  previewMode = false;

  private readonly listingsService = inject(ListingsService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  private readonly listingImages = [
    'photo-1600210492486-724fe5c67fb0',
    'photo-1600607687939-ce8a6c25118c',
    'photo-1600566753086-00f18fb6b3ea',
    'photo-1600607687920-4e2a09cf159d',
    'photo-1600573472591-ee6b68d14c68',
    'photo-1600047509807-ba8f99d2cdde',
  ];

  private chooseListingImage(): string {
    const usedImages = new Set(this.listingsService.getListings().map((listing) => listing.image));

    const availableImages = this.listingImages.filter((image) => !usedImages.has(image));

    const choices = availableImages.length ? availableImages : this.listingImages;

    return choices[Math.floor(Math.random() * choices.length)];
  }

  readonly buildingTypes = ['Apartment', 'Independent House', 'Villa', 'Studio', 'Other'];

  readonly amenityOptions = [
    'Gym/Fitness Center',
    'Swimming Pool',
    'Car Park',
    'Visitors Parking',
    'Power Backup',
    'Garbage Disposal',
    'Private Lawn',
    'Water Heater',
    'Plant Security System',
    'Laundry Service',
    'Elevator',
    'Club House',
  ];

  listing = {
    buildingType: '',
    buildingName: '',
    isShared: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    streetAddress: '',
    city: '',
    area: null as number | null,
    bedrooms: 1,
    bathrooms: 1,
    lease: '',
    rent: null as number | null,
    negotiable: false,
    priceMode: '',
    utilitiesIncluded: false,
    furnished: '',
    amenities: [] as string[],
    vegetarianPreference: '',
    title: '',
    description: '',
  };

  toggleAmenity(amenity: string, checked: boolean): void {
    if (checked && !this.listing.amenities.includes(amenity)) {
      this.listing.amenities = [...this.listing.amenities, amenity];
    } else if (!checked) {
      this.listing.amenities = this.listing.amenities.filter((item) => item !== amenity);
    }
  }

  editListing(): void {
    this.previewMode = false;
    this.submitError = '';
  }

  submitListing(): void {
    this.submitted = true;
    this.submitError = '';
    this.submitSuccess = '';

    if (
      !this.listing.buildingType ||
      this.listing.buildingName.trim().length < 2 ||
      !this.listing.isShared ||
      this.listing.contactName.trim().length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.listing.contactEmail) ||
      !/^[0-9+() -]{7,20}$/.test(this.listing.contactPhone) ||
      this.listing.streetAddress.trim().length < 5 ||
      this.listing.city.trim().length < 2 ||
      !this.listing.area ||
      this.listing.area <= 0 ||
      !this.listing.lease ||
      !this.listing.rent ||
      this.listing.rent <= 0 ||
      !this.listing.priceMode ||
      !this.listing.furnished ||
      !this.listing.vegetarianPreference ||
      this.listing.title.trim().length < 5 ||
      this.listing.description.trim().length < 20 ||
      this.listing.description.length > 1400
    ) {
      this.previewMode = false;
      this.submitError = 'Please complete all required fields correctly.';
      return;
    }

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/create-listing' },
      });
      return;
    }

    // First valid submission opens the preview.
    if (!this.previewMode) {
      this.previewMode = true;
      return;
    }

    // Only publish after the user confirms from the preview.
    const saved = this.listingsService.addListing({
      ...this.listing,
      title: this.listing.title.trim(),
      description: this.listing.description.trim(),
      buildingName: this.listing.buildingName.trim(),
      contactName: this.listing.contactName.trim(),
      contactEmail: this.listing.contactEmail.trim().toLowerCase(),
      contactPhone: this.listing.contactPhone.trim(),
      streetAddress: this.listing.streetAddress.trim(),
      city: this.listing.city.trim(),
      area: this.listing.area!,
      rent: this.listing.rent!,
      image: this.chooseListingImage(),
      tag: 'New',
      beds: this.listing.bedrooms,
      baths: this.listing.bathrooms,
    });

    this.submitSuccess = 'Your property listing has been published successfully!';

    this.router.navigate(['/listings', saved.id]);
  }
}
