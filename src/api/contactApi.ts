import emailjs from '@emailjs/browser';

import type { ContactFormData } from '../types/forms';
import { BUSINESS_EMAIL } from '../config/email';

export const submitContactForm = (
  data: ContactFormData,
) => {
  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      name: data.name,
      phone: data.phone,
      email: data.email,
      project: data.project,
      message: data.message,
      time: new Date().toLocaleString(),
      to_email: BUSINESS_EMAIL,
    },
    {
      publicKey:
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    },
  );
};