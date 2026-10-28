import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavouritesService } from '../../core/favourites';
import { ListingsService } from '../../core/listings';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './favourites.html',
  styleUrl: './favourites.scss',
})
export class Favourites {
  private readonly favouritesService = inject(FavouritesService);
  private readonly listingsService = inject(ListingsService);

  properties = [
    {
      id: 1,
      title: 'Modern minimalist apartment',
      city: 'Bandra West, Mumbai',
      price: 45000,
      image: 'photo-1600210492486-724fe5c67fb0',
    },
    {
      id: 2,
      title: 'Sunlit contemporary home',
      city: 'Indiranagar, Bengaluru',
      price: 32000,
      image: 'photo-1600607687939-ce8a6c25118c',
    },
    {
      id: 3,
      title: 'Elegant urban residence',
      city: 'Gurugram, Delhi NCR',
      price: 55000,
      image: 'photo-1600566753086-00f18fb6b3ea',
    },
    {
      id: 4,
      title: 'Warm and airy living space',
      city: 'Whitefield, Bengaluru',
      price: 28000,
      image: 'photo-1600607687920-4e2a09cf159d',
    },
    {
      id: 5,
      title: 'Premium city apartment',
      city: 'Powai, Mumbai',
      price: 48000,
      image: 'photo-1600573472591-ee6b68d14c68',
    },
    {
      id: 6,
      title: 'Quiet modern retreat',
      city: 'Hitech City, Hyderabad',
      price: 26000,
      image: 'photo-1600047509807-ba8f99d2cdde',
    },
  ];

  get savedProperties() {
    const savedIds = this.favouritesService.getFavourites();

    const createdProperties = this.listingsService.getListings().map((listing) => ({
      id: listing.id,
      title: listing.title,
      city: listing.city,
      price: listing.rent,
      image: listing.image,
    }));

    const allProperties = [...this.properties, ...createdProperties];

    return allProperties.filter((property) => savedIds.includes(property.id));
  }

  imageUrl(image: string): string {
    return `https://images.unsplash.com/${image}?auto=format&fit=crop&w=800&q=80`;
  }

  removeFavourite(id: number): void {
    this.favouritesService.toggleFavourite(id);
  }
}
