import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { sendContactEmail } from '../services/emailService';

const router = Router();

const isValidPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  return (
    digits.length === 10 ||
    (digits.length === 11 && digits.startsWith('1'))
  );
};

router.post(
  '/',
  [
    body('name')
      .trim()
      .isLength({ min: 2 })
      .withMessage('Please enter your name.'),
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('phone')
      .trim()
      .custom((value) => isValidPhone(value))
      .withMessage('Please enter a valid phone number.'),
    body('message')
      .trim()
      .isLength({ min: 40 })
      .withMessage('Please provide more information about your project.'),
    body('project').optional().trim(),
    body('service').optional().trim(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Please check the form and try again.',
        errors: errors.array(),
      });
    }

    try {
      const { name, email, phone, project, service, message } = req.body;

      await sendContactEmail({
        name,
        email,
        phone,
        project,
        service,
        message,
      });

      return res.status(200).json({
        success: true,
        message: 'Your request has been sent successfully!',
      });
    } catch (error) {
      console.error('Contact form email error:', error);

      return res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again.',
      });
    }
  },
);

export default router;