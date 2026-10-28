import { TestBed } from '@angular/core/testing';
import { FavouritesService } from './favourites';
import { AuthService } from './auth.service';

describe('FavouritesService', () => {
  let service: FavouritesService;
  let authService: AuthService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        FavouritesService,
        {
          provide: AuthService,
          useValue: {
            getCurrentUser: vi.fn(),
          },
        },
      ],
    });

    service = TestBed.inject(FavouritesService);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add and retrieve a favourite for the logged-in user', () => {
    vi.mocked(authService.getCurrentUser).mockReturnValue({
      name: 'Anav',
      email: 'anav@lamba.com',
    });

    service.toggleFavourite(123);

    expect(service.getFavourites()).toContain(123);
    expect(localStorage.getItem('renthub_favourites_anav@lamba.com')).toBe('[123]');
  });

  it('should keep favourites separate between accounts', () => {
    vi.mocked(authService.getCurrentUser).mockReturnValue({
      name: 'Anav',
      email: 'anav@lamba.com',
    });

    service.toggleFavourite(123);

    vi.mocked(authService.getCurrentUser).mockReturnValue({
      name: 'Navya',
      email: 'navya@lamba.com',
    });

    expect(service.getFavourites()).toEqual([]);

    service.toggleFavourite(456);
    expect(service.getFavourites()).toEqual([456]);

    vi.mocked(authService.getCurrentUser).mockReturnValue({
      name: 'Anav',
      email: 'anav@lamba.com',
    });

    expect(service.getFavourites()).toEqual([123]);
  });

  it('should return no favourites when nobody is logged in', () => {
    vi.mocked(authService.getCurrentUser).mockReturnValue(null);

    expect(service.getFavourites()).toEqual([]);
    service.toggleFavourite(123);
    expect(localStorage.length).toBe(0);
  });
});
