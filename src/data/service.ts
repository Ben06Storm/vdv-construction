

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
