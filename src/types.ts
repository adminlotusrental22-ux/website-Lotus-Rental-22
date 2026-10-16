export type ScooterCategory = 'all' | 'compact' | 'sport' | 'maxi';

export interface ScooterModel {
  id: string;
  name: string;
  category: 'compact' | 'sport' | 'maxi';
  categoryLabel: string;
  engineCc: string;
  transmission: string;
  dailyRateIdr: number;
  imageUrl: string;
  badge?: string;
  badgeColor?: 'gold' | 'teal' | 'coral';
  isAvailable?: boolean;
  shortDesc: string;
  idealFor: string;
  fuelCapacity: string;
  underSeatStorage: string;
  features: string[];
}

export type Currency = 'IDR' | 'USD' | 'EUR';

export interface ScooterUnitBooking {
  unitId: string;
  scooterId: string;
}

export type DeliveryLocationType = 'airport' | 'hotel' | 'outside';

export type DurationOption = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 14;

export interface RouteDestination {
  id: string;
  title: string;
  subtitle: string;
  distance: string;
  timeMins: string;
  roadCondition: string;
  recommendedScooter: string;
  scooterModelId: string;
  imageUrl: string;
  highlights: string[];
  tag: string;
}

export interface HandoverPhoto {
  id: string;
  customerName: string;
  country: string;
  location: string;
  scooterRented: string;
  rating: number;
  comment: string;
  imageUrl: string;
  date: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'booking' | 'delivery' | 'riding';
}
