export type Rating = 1 | 2 | 3 | 4 | 5;

export type Review = {
  id: number;
  name: string;
  city: string;
  rating: Rating;
  review: string;
};

export const reviewsCards: Review[] = [
  {
    id: 1,
    name: 'John Smith',
    city: 'Portland, OR',
    rating: 5,
    review:
      'We were extremely happy with the quality of work and professionalism of the entire team. From the initial consultation to the final details, everything was handled with great attention to detail. The project was completed on time, and the result exceeded our expectations.',
  },
  {
    id: 2,
    name: 'Michael Johnson',
    city: 'Vancouver, WA',
    rating: 4,
    review:
      'The team did an excellent job on our renovation project. Communication was clear throughout the process, and everyone was professional and respectful of our home. There were a few minor delays, but the final result was worth it.',
  },
  {
    id: 3,
    name: 'Sarah Williams',
    city: 'Portland, OR',
    rating: 5,
    review:
      'VDV Construction completely transformed our space and made the entire experience much easier than we expected. The team listened carefully to our ideas, offered helpful suggestions, and paid attention to every detail.',
  },
  {
    id: 4,
    name: 'John Smith',
    city: 'Portland, OR',
    rating: 2,
    review:
      'We were extremely happy with the quality of work and professionalism of the entire team. From the initial consultation to the final details, everything was handled with great attention to detail. The project was completed on time, and the result exceeded our expectations.',
  },
  {
    id: 5,
    name: 'Michael Johnson',
    city: 'Vancouver, WA',
    rating: 3,
    review:
      'The team did an excellent job on our renovation project. Communication was clear throughout the process, and everyone was professional and respectful of our home. There were a few minor delays, but the final result was worth it.',
  },
  {
    id: 6,
    name: 'Sarah Williams',
    city: 'Portland, OR',
    rating: 4,
    review:
      'VDV Construction completely transformed our space and made the entire experience much easier.',
  },
];