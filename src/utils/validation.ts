import type {
  ContactFormData,
  ServiceRequestFormData,
} from '../types/forms';

type CommonFormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export type BaseFormErrors = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
};

export type FormErrors = BaseFormErrors & {
  project?: string;
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

export const isValidEmail = (
  email: string,
): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
};

const validateCommonFields = (
  formData: CommonFormData,
): BaseFormErrors => {
  const errors: BaseFormErrors = {};

  if (!formData.name.trim()) {
    errors.name = 'Please enter your name.';
  } else if (formData.name.trim().length < 2) {
    errors.name =
      'Name must contain at least 2 characters.';
  }

  if (!formData.phone.trim()) {
    errors.phone =
      'Please enter your phone number.';
  } else if (!isValidPhone(formData.phone)) {
    errors.phone =
      'Please enter a valid phone number.';
  }

  if (!formData.email.trim()) {
    errors.email =
      'Please enter your email address.';
  } else if (!isValidEmail(formData.email)) {
    errors.email =
      'Please enter a valid email address.';
  }

  if (!formData.message.trim()) {
    errors.message =
      'Please tell us about your project.';
  } else if (formData.message.trim().length < 40) {
    errors.message =
      'Please provide more information about your project.';
  }

  return errors;
};

export const validateForm = (
  formData: ContactFormData,
): FormErrors => {
  const errors: FormErrors =
    validateCommonFields(formData);

  if (!formData.project) {
    errors.project =
      'Please select a project type.';
  }

  return errors;
};

export const validateServiceRequestForm = (
  formData: ServiceRequestFormData,
): BaseFormErrors => {
  return validateCommonFields(formData);
};