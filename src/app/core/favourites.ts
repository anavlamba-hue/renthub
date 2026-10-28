import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private readonly storageKey = 'renthub_favourites';

  getFavourites(): number[] {
    try {
      const saved = localStorage.getItem(this.storageKey);

      if (!saved) {
        return [];
      }

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
    const favourites = this.getFavourites();

    const updated = favourites.includes(id)
      ? favourites.filter((item) => item !== id)
      : [...favourites, id];

    localStorage.setItem(this.storageKey, JSON.stringify(updated));
  }
}
