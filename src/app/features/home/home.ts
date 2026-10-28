import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavouritesService } from '../../core/favourites';
import { ListingsService } from '../../core/listings';

interface Property {
  id: number;
  title: string;
  city: string;
  address?: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  image: string;
  tag: string;
  amenities: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly favouritesService = inject(FavouritesService);
  private readonly listingsService = inject(ListingsService);

  searchText = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minBeds = '';
  selectedAmenity = '';
  sortBy = 'featured';
  currentPage = 1;
  readonly pageSize = 6;

  readonly availableAmenities = [
    'Wi-Fi',
    'Parking',
    'Air conditioning',
    'Gym',
    'Swimming pool',
    'Balcony',
    'Washing machine',
    'Security',
  ];

  isFavourite(id: number): boolean {
    return this.favouritesService.isFavourite(id);
  }

  toggleFavourite(id: number): void {
    this.favouritesService.toggleFavourite(id);
  }

  properties: Property[] = [
    {
      id: 1,
      title: 'Modern minimalist apartment',
      city: 'Bandra West, Mumbai',
      price: 45000,
      beds: 2,
      baths: 2,
      area: 1150,
      image: 'photo-1600210492486-724fe5c67fb0',
      tag: 'Featured',
      amenities: ['Wi-Fi', 'Parking', 'Gym', 'Balcony'],
    },
    {
      id: 2,
      title: 'Sunlit contemporary home',
      city: 'Indiranagar, Bengaluru',
      price: 32000,
      beds: 2,
      baths: 1,
      area: 980,
      image: 'photo-1600607687939-ce8a6c25118c',
      tag: 'Popular',
      amenities: ['Wi-Fi', 'Air conditioning', 'Washing machine'],
    },
    {
      id: 3,
      title: 'Elegant urban residence',
      city: 'Gurugram, Delhi NCR',
      price: 55000,
      beds: 3,
      baths: 2,
      area: 1450,
      image: 'photo-1600566753086-00f18fb6b3ea',
      tag: 'New',
      amenities: ['Parking', 'Gym', 'Swimming pool', 'Security'],
    },
    {
      id: 4,
      title: 'Warm and airy living space',
      city: 'Whitefield, Bengaluru',
      price: 28000,
      beds: 2,
      baths: 2,
      area: 1050,
      image: 'photo-1600607687920-4e2a09cf159d',
      tag: 'Great value',
      amenities: ['Balcony', 'Parking', 'Security'],
    },
    {
      id: 5,
      title: 'Premium city apartment',
      city: 'Powai, Mumbai',
      price: 48000,
      beds: 3,
      baths: 2,
      area: 1320,
      image: 'photo-1600573472591-ee6b68d14c68',
      tag: 'Popular',
      amenities: ['Wi-Fi', 'Gym', 'Air conditioning', 'Security'],
    },
    {
      id: 6,
      title: 'Quiet modern retreat',
      city: 'Hitech City, Hyderabad',
      price: 26000,
      beds: 2,
      baths: 1,
      area: 920,
      image: 'photo-1600047509807-ba8f99d2cdde',
      tag: 'New',
      amenities: ['Wi-Fi', 'Balcony', 'Washing machine'],
    },
  ];

  featured = this.properties[0];

  get allProperties(): Property[] {
    const savedProperties = this.listingsService.getListings().map((listing) => ({
      id: listing.id,
      title: listing.title,
      city: listing.city,
      address: listing.streetAddress,
      price: listing.rent,
      beds: listing.beds,
      baths: listing.baths,
      area: listing.area,
      image: listing.image,
      tag: listing.tag,
      amenities: listing.amenities ?? [],
    }));

    return [...savedProperties, ...this.properties];
  }

  get filteredProperties(): Property[] {
    const query = this.searchText.trim().toLowerCase();

    let results = this.allProperties.filter((property) => {
      const matchesSearch =
        !query ||
        `${property.title} ${property.city} ${property.address ?? ''}`
          .toLowerCase()
          .includes(query);

      const matchesMinPrice =
        this.minPrice === null ||
        this.minPrice === undefined ||
        this.minPrice === 0 ||
        property.price >= this.minPrice;

      const matchesMaxPrice =
        this.maxPrice === null ||
        this.maxPrice === undefined ||
        this.maxPrice === 0 ||
        property.price <= this.maxPrice;

      const matchesBeds = this.minBeds === '' || property.beds >= Number(this.minBeds);

      const matchesAmenity =
        this.selectedAmenity === '' ||
        property.amenities.some(
          (amenity) => amenity.toLowerCase() === this.selectedAmenity.toLowerCase(),
        );

      return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesBeds && matchesAmenity;
    });

    results = [...results];

    switch (this.sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'title':
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'area':
        results.sort((a, b) => b.area - a.area);
        break;
    }

    return results;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredProperties.length / this.pageSize));
  }

  get paginatedProperties(): Property[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProperties.slice(start, start + this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  updateFilters(): void {
    this.currentPage = 1;
  }

  clearFilters(): void {
    this.searchText = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.minBeds = '';
    this.selectedAmenity = '';
    this.sortBy = 'featured';
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextFeatured(): void {
    const properties = this.allProperties;
    const index = properties.findIndex((property) => property.id === this.featured.id);
    const nextIndex = index < 0 ? 0 : (index + 1) % properties.length;
    this.featured = properties[nextIndex];
  }

  previousFeatured(): void {
    const properties = this.allProperties;
    const index = properties.findIndex((property) => property.id === this.featured.id);
    const previousIndex =
      index < 0 ? properties.length - 1 : (index - 1 + properties.length) % properties.length;

    this.featured = properties[previousIndex];
  }

  imageUrl(image: string): string {
    return `https://images.unsplash.com/${image}?auto=format&fit=crop&w=1000&q=80`;
  }
}
