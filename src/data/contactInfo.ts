import {
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

import { BUSINESS_EMAIL } from '../config/email';

export const contactInfo = [
  {
    icon: Phone,
    text: '971-895-5827',
    href: 'tel:971-895-5827',
  },
  {
    icon: Mail,
    text: BUSINESS_EMAIL,
    href: `mailto:${BUSINESS_EMAIL}`,
  },
  {
    icon: MapPin,
    text: 'Portland, Oregon & Vancouver, Washington',
    href: 'https://maps.app.goo.gl/tCmacB8Sm3kKh9Ar6',
  },
];