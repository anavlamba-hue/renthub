import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';
import { FavouritesService } from '../../../core/favourites';
import { ListingsService } from '../../../core/listings';
import { EnquiriesService } from '../../../core/enquiries';

interface PropertyDetails {
  id: number;
  title: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  image: string;
  tag: string;
  description: string;
  amenities: string[];
  furnished: string;
  lease: string;
  utilitiesIncluded: boolean;
}

@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './listing-details.html',
  styleUrl: './listing-details.scss',
})
export class ListingDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly enquiriesService = inject(EnquiriesService);
  private readonly favouritesService = inject(FavouritesService);
  private readonly listingsService = inject(ListingsService);

  isFavourite(id: number): boolean {
    return this.favouritesService.isFavourite(id);
  }

  toggleFavourite(id: number): void {
    this.favouritesService.toggleFavourite(id);
  }

  private readonly properties: PropertyDetails[] = [
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
      description:
        'A thoughtfully designed contemporary home with inviting interiors, generous natural light and comfortable spaces for everyday living.',
      amenities: ['Gym / Fitness Center', 'Car Park', 'Power Backup', 'Elevator'],
      furnished: 'Furnished',
      lease: 'Long term (6+ months)',
      utilitiesIncluded: false,
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
      description:
        'A bright, welcoming home with contemporary finishes and a practical layout, close to the everyday conveniences of the neighbourhood.',
      amenities: ['Car Park', 'Water Heater', 'Laundry Service'],
      furnished: 'Furnished',
      lease: 'Both',
      utilitiesIncluded: true,
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
      description:
        'A spacious urban residence designed for comfortable city living, with a generous floor plan and stylish interiors.',
      amenities: ['Swimming Pool', 'Gym / Fitness Center', 'Visitors Parking', 'Elevator'],
      furnished: 'Furnished',
      lease: 'Long term (6+ months)',
      utilitiesIncluded: false,
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
      description:
        'A comfortable home with a relaxed atmosphere, well-proportioned rooms and space to make your own.',
      amenities: ['Car Park', 'Power Backup', 'Water Heater'],
      furnished: 'Unfurnished',
      lease: 'Short term',
      utilitiesIncluded: true,
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
      description:
        'A premium apartment with a modern aesthetic and comfortable living spaces suited to city life.',
      amenities: ['Swimming Pool', 'Gym / Fitness Center', 'Club House', 'Elevator'],
      furnished: 'Furnished',
      lease: 'Long term (6+ months)',
      utilitiesIncluded: false,
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
      description:
        'A practical, inviting space in a well-connected area, offering a comfortable base for work and everyday life.',
      amenities: ['Car Park', 'Power Backup', 'Laundry Service'],
      furnished: 'Unfurnished',
      lease: 'Both',
      utilitiesIncluded: true,
    },
  ];

  property: PropertyDetails | undefined;
  comments: {
    name: string;
    text: string;
    replies: { name: string; text: string }[];
  }[] = [];
  commentText = '';
  replyText: { [index: number]: string } = {};
  enquirySubmitted = false;

  private get commentsStorageKey(): string {
    return `renthub_comments_${this.property?.id ?? 'unknown'}`;
  }

  constructor() {
    this.loadProperty();
  }

  private loadProperty(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const savedListing = this.listingsService.getListingById(id);

    if (savedListing) {
      this.property = {
        id: savedListing.id,
        title: savedListing.title,
        city: savedListing.city,
        price: savedListing.rent,
        beds: savedListing.beds,
        baths: savedListing.baths,
        area: savedListing.area,
        image: savedListing.image,
        tag: savedListing.tag,
        description: savedListing.description,
        amenities: savedListing.amenities,
        furnished: savedListing.furnished,
        lease: savedListing.lease,
        utilitiesIncluded: savedListing.utilitiesIncluded,
      };
    } else {
      this.property = this.properties.find((item) => item.id === id);
    }

    try {
      const savedComments = localStorage.getItem(this.commentsStorageKey);

      this.comments = savedComments
        ? (
            JSON.parse(savedComments) as {
              name: string;
              text: string;
              replies?: { name: string; text: string }[];
            }[]
          ).map((comment) => ({
            name: comment.name,
            text: comment.text,
            replies: comment.replies ?? [],
          }))
        : [];
    } catch {
      this.comments = [];
    }
  }

  imageUrl(image: string): string {
    return `https://images.unsplash.com/${image}?auto=format&fit=crop&w=1400&q=85`;
  }

  addComment(): void {
    const text = this.commentText.trim();

    if (text.length < 2 || text.length > 500) {
      return;
    }

    this.comments = [...this.comments, { name: 'Guest', text, replies: [] }];

    localStorage.setItem(this.commentsStorageKey, JSON.stringify(this.comments));

    this.commentText = '';
  }

  addReply(index: number): void {
    const text = (this.replyText[index] ?? '').trim();

    if (text.length < 2 || text.length > 500) {
      return;
    }

    const comment = this.comments[index];

    if (!comment) {
      return;
    }

    comment.replies = [...(comment.replies ?? []), { name: 'Guest', text }];

    this.comments = [...this.comments];

    localStorage.setItem(this.commentsStorageKey, JSON.stringify(this.comments));

    this.replyText[index] = '';
  }

  enquire(): void {
    if (!this.property) {
      return;
    }

    const user = this.authService.getCurrentUser();

    if (!user) {
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: this.router.url,
        },
      });
      return;
    }

    this.enquiriesService.addEnquiry({
      propertyId: this.property.id,
      propertyTitle: this.property.title,
      userName: user.name,
      userEmail: user.email,
    });

    this.enquirySubmitted = true;
  }
}
