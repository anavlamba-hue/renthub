import { TestBed } from '@angular/core/testing';
import { FavouritesService } from './favourites';

describe('FavouritesService', () => {
  let service: FavouritesService;

  beforeEach(() => {
    localStorage.removeItem('renthub_favourites');

    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add and retrieve a favourite', () => {
    service.toggleFavourite(123);

    expect(service.getFavourites()).toContain(123);
  });
});
