type FormData = {
  name: string;
  phone: string;
  email: string;
  project: string;
  message: string;
};

export type FormErrors = {
  name?: string;
  phone?: string;
  email?: string;
  project?: string;
  message?: string;
};

export const isValidPhone = (
  phone: string,
): boolean => {
  const digits = phone.replace(/\D/g, '');

  return (
    digits.length === 10 ||
    (digits.length === 11 &&
      digits.startsWith('1'))
  );
};
export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
};

export const validateForm = (
  formData: FormData,
): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.name.trim()) {
    errors.name = 'Please enter your name.';
  }

  if (!formData.phone.trim()) {
    errors.phone = 'Please enter your phone number.';
  } else if (!isValidPhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!formData.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!formData.project) {
    errors.project = 'Please select a project type.';
  }

  if (!formData.message.trim()) {
    errors.message = 'Please tell us about your project.';
  }

  return errors;
};