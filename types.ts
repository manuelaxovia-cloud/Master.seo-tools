
export type AppTool = 'schema' | 'llms' | 'validator';

export interface ImageValidationResult {
  id: string;
  name: string;
  format: string;
  sizeKb: number;
  formatOk: boolean;
  sizeOk: boolean;
  nameOk: boolean;
  overallOk: boolean;
}

export interface HotelData {
  id: string;
  name: string;
}

export interface SchemaState {
  hotelName: string;
  description: string;
  url: string;
  images: string[];
  phone: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  geo: {
    lat: string;
    lng: string;
  };
  starRating: string;
  amenities: string[];
  checkin: string;
  checkout: string;
  priceRange: string;
  parentOrg: {
    name: string;
    legalName: string;
    url: string;
    logo: string;
  };
  faq: { q: string; a: string }[];
  breadcrumbs: { name: string; url: string }[];
}

export interface LLMSState {
  site: string;
  brand: string;
  owner: string;
  type: string;
  categories: string[];
  location: string;
  languages: string[];
  description: string;
  email: string;
  phone: string;
  address: string;
  hours: string;
  checkin: string;
  checkout: string;
  pages: { title: string; path: string }[];
  rooms: string[];
  experiences: string[];
  features: string[];
  awards: string[];
  pricing: string;
  policies: string[];
  nearby: string[];
  keywords: string[];
  audience: string[];
  schemaTypes: string[];
  sitemap: string;
  restrictions: string[];
  social: string[];
}
