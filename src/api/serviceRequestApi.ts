import emailjs from '@emailjs/browser';

import type {
  ServiceRequestPayload,
} from '../types/forms';

export const submitServiceRequest = (
  data: ServiceRequestPayload,
) => {
  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      name: data.name,
      phone: data.phone,
      email: data.email,
      service: data.service,
      message: data.message,
      time: new Date().toLocaleString(),
    },
    {
      publicKey:
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    },
  );
};