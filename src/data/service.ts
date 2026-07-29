
import LuxuryTile from '../assets/images/luxuryTile.png';
import Deck from '../assets/images/decks.png';
import Heated from '../assets/images/heatedFloor.png';
import LargeTile from '../assets/images/largeTile.png';
import Sauna from '../assets/images/sauna.png';
import BathroomRemodeling from '../assets/images/bathroomRemodeling.png';
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
    title: 'Large Format Tile Slabs',
    image: LargeTile,
  },
  {
    id: 3,
    title: 'Bathroom Remodeling',
    image: BathroomRemodeling,
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
