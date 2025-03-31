import parsePhoneNumber from 'libphonenumber-js';
import { z } from 'zod';

export const zPhoneNumber = z
  .string()
  .optional()
  .refine(
    (value) => {
      if (!value) return true; // Allow empty value
      const phoneNumber = parsePhoneNumber(value, { defaultCountry: 'UZ' });
      return phoneNumber?.isValid();
    },
    { message: 'Invalid Uzbekistan phone number' }
  );

// export const loginSchema = z
//   .object({
//     email: z
//       .string()
//       .email({ message: 'Invalid email format' })
//       .or(z.literal(null)) // Allow null explicitly
//       .optional(), // Optional because either email or phone can be used
//     phone: zPhoneNumber.or(z.literal(null)).optional(), // Allow null explicitly
//     password: z.string().min(8, 'Password must be at least 8 characters'),
//   })
//   .superRefine((data, ctx) => {
//     // Ensure at least one field is filled (whichever is active)
//     if (!data.email && !data.phone) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: 'Email or phone is required',
//         path: data.email !== '' ? ['email'] : ['phone'], // Error appears only on active input
//       });
//     }
//   });

export const loginSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email format' }).optional(),
    phone: zPhoneNumber.optional(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.email || data.phone, {
    message: 'Email or phone is required',
  });

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z
      .string()
      .optional()
      .refine(
        (value) => !value || z.string().email().safeParse(value).success,
        {
          message: 'Invalid email format',
        }
      ),
    phone: zPhoneNumber,
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  //   .refine((data) => data.password === data.confirmPassword, {
  //     message: 'Passwords do not match',
  //     path: ['confirmPassword'],
  //   })
  .superRefine((data, ctx) => {
    // Ensure at least one field is filled (whichever is active)
    if (!data.email?.trim() && !data.phone?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Email or phone is required',
        path: ['email'], // Assigning error to email for form validation
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Email or phone is required',
        path: ['phone'], // Assigning error to phone for form validation
      });
    }

    // Ensure password confirmation matches (if present)
    if (
      data.confirmPassword !== undefined &&
      data.password !== data.confirmPassword
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

// export const zPhoneNumber = z.string().transform((value, ctx) => {
//   const phoneNumber = parsePhoneNumber(value, 'UZ');

//   if (!phoneNumber?.isValid()) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: 'Invalid phone number',
//     });
//     return z.NEVER;
//   }

//   return phoneNumber.number;
// });
