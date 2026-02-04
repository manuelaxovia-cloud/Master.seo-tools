
import { HotelData } from './types';

export const HOTELS: HotelData[] = [
  { id: 'elCallejon', name: 'El Callejón' },
  { id: 'samare', name: 'Samare' },
  { id: 'santuario', name: 'Santuario' },
  { id: 'muare', name: 'Muare' },
  { id: 'colima', name: 'Colima 71' },
  { id: 'nukari', name: 'Nukari' },
  { id: 'santamartha', name: 'Santa Martha' },
  { id: 'lebartVilla', name: 'Le Barth Villa' },
  { id: 'kunuk', name: 'Kunuk' },
  { id: 'raintree', name: 'Raintree' },
];

export const VALID_FORMATS = ['webp', 'svg'];
export const MAX_SIZE_KB = 300;
export const KEYWORDS = [
  'destacado', 'highlight', 'thumbnail', 'tumbnail', 'galeria', 
  'slider', 'slidemobile', 'content', 'offer', 'oferta', 
  'otras-ofertas', 'img-contenido', 'top', 'boton', 'button', 
  'bottom', 'superior', 'inferior', 'media'
];

export const DEFAULT_SCHEMA_STATE = {
  hotelName: '',
  description: '',
  url: '',
  images: [],
  phone: '',
  address: {
    street: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'MX',
  },
  geo: { lat: '', lng: '' },
  starRating: '4',
  amenities: [],
  checkin: '15:00',
  checkout: '12:00',
  priceRange: '$$$',
  parentOrg: {
    name: '',
    legalName: '',
    url: '',
    logo: '',
  },
  faq: [],
  breadcrumbs: [{ name: 'Home', url: '/' }],
};

export const DEFAULT_LLMS_STATE = {
  site: '',
  brand: '',
  owner: '',
  type: 'Luxury boutique hotel',
  categories: ['Boutique hotel', 'Design hotel'],
  location: '',
  languages: ['en-US', 'es-MX'],
  description: '',
  email: '',
  phone: '',
  address: '',
  hours: '24/7',
  checkin: '15:00',
  checkout: '12:00',
  pages: [],
  rooms: [],
  experiences: [],
  features: [],
  awards: [],
  pricing: '',
  policies: [],
  nearby: [],
  keywords: [],
  audience: [],
  schemaTypes: ['Hotel', 'LocalBusiness'],
  sitemap: '',
  restrictions: ['disallow: /admin', 'training: disallow'],
  social: [],
};
