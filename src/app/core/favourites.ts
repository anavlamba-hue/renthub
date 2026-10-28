import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class FavouritesService {
  constructor(private authService: AuthService) {}

  private getStorageKey(): string | null {
    const user = this.authService.getCurrentUser();

    return user ? `renthub_favourites_${user.email.toLowerCase()}` : null;
  }

  getFavourites(): number[] {
    const key = this.getStorageKey();
    if (!key) return [];

    try {
      const saved = localStorage.getItem(key);
      if (!saved) return [];

      const parsed: unknown = JSON.parse(saved);

      if (Array.isArray(parsed) && parsed.every((id): id is number => typeof id === 'number')) {
        return parsed;
      }

      return [];
    } catch {
      return [];
    }
  }

  isFavourite(id: number): boolean {
    return this.getFavourites().includes(id);
  }

  toggleFavourite(id: number): void {
    const key = this.getStorageKey();
    if (!key) return;

    const favourites = this.getFavourites();

    const updated = favourites.includes(id)
      ? favourites.filter((item) => item !== id)
      : [...favourites, id];

    localStorage.setItem(key, JSON.stringify(updated));
  }
}
