import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListingDetails } from './listing-details';
import { provideRouter } from '@angular/router';

describe('ListingDetails', () => {
  let component: ListingDetails;
  let fixture: ComponentFixture<ListingDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingDetails],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ListingDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
