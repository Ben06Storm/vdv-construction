

import LuxuryTile from '../assets/images/luxuryTile.png';
import Deck from '../assets/images/decks.png';
import Heated from '../assets/images/heatedFloor.png';
import Porcelain from '../assets/images/porcelainSlabs.png';
import Sauna from '../assets/images/sauna.png';
import Shower from '../assets/images/shower.png';
import Waterproof from '../assets/images/waterproof.png';
import CommercialTile from '../assets/images/comercialTile.png';


export interface Service {
  id: number;
  title: string;
  image: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: 'Luxury Tile Installation',
    image: LuxuryTile,
  },
  {
    id: 2,
    title: 'Large Format Porcelain Slabs',
    image: Porcelain,
  },
  {
    id: 3,
    title: 'Custom Showers',
    image: Shower,
  },
  {
    id: 4,
    title: 'Heated Floors',
    image: Heated,
  },
    {
    id: 5,
    title: 'Waterproofing',
    image: Waterproof,
  },
  {
    id: 6,
    title: 'Premium Decks',
    image: Deck,
  },
  {
    id: 7,
    title: 'Sauna Construction',
    image: Sauna,
  },
    {
    id: 8,
    title: 'Commercial Tile Installation',
    image: CommercialTile,
  },
];

/*export const services = [
  {
    image: tile,
    title: 'Tile Installation',
    description:
      'Professional installation of ceramic, porcelain, and natural stone tiles.',
  },
  {
    image: decks,
    title: 'Premium Decks',
    description:
      'Beautiful and durable custom deck construction for outdoor living.',
  },
  {
    image: heatedFloor,
    title: 'Heated Floors',
    description:
      'Comfortable and energy-efficient heated floor systems for your home.',
  },
  {
    image: porcelain,
    title: 'Large Format Porcelain Slabs',
    description:
      'Precision installation of large-format porcelain slabs for modern interiors.',
  },
  {
    image: sauna,
    title: 'Sauna Construction',
    description:
      'Custom-designed saunas built with premium materials and craftsmanship.',
  },
  {
    image: shower,
    title: 'Custom Showers',
    description:
      'Elegant and waterproof custom shower installations tailored to your space.',
  },
];
*/