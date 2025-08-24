
'use server';

import { z } from 'zod';

const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

const PartnerFormSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  ownerName: z.string().min(2, { message: "Owner's name must be at least 2 characters." }),
  iceNumber: z.string().min(1, { message: "ICE number is required." }),
  rcNumber: z.string().min(1, { message: "RC number is required." }),
  category: z.enum(['Cars', 'Private Drivers', 'Boats', 'Activities'], {
    required_error: "You need to select a service category.",
  }),
  city: z.enum(['Agadir', 'Marrakech', 'Fes', 'Casablanca', 'Tangier', 'Rabat', 'Essaouira'], {
      required_error: "You need to select your primary city of operation.",
  }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().regex(phoneRegex, { message: "Please enter a valid phone number." }),
  whatsapp: z.string().regex(phoneRegex, { message: "Please enter a valid WhatsApp number." }),
  serviceDescription: z.string().min(100, { message: "Description must be 100-800 characters." }).max(800, { message: "Description must be 100-800 characters." }),
  isAuthorized: z.literal(true, {
    errorMap: () => ({ message: "You must be authorized to represent this company." }),
  }),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and privacy policy." }),
  }),
});

export type FormState = {
  message: string;
  errors?: {
    [key in keyof z.infer<typeof PartnerFormSchema>]?: string[];
  };
  success: boolean;
};

export async function submitPartnerApplication(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  
  const validatedFields = PartnerFormSchema.safeParse({
    companyName: formData.get('companyName'),
    ownerName: formData.get('ownerName'),
    iceNumber: formData.get('iceNumber'),
    rcNumber: formData.get('rcNumber'),
    category: formData.get('category'),
    city: formData.get('city'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    whatsapp: formData.get('whatsapp'),
    serviceDescription: formData.get('serviceDescription'),
    isAuthorized: formData.get('isAuthorized') === 'on',
    acceptTerms: formData.get('acceptTerms') === 'on',
  });

  if (!validatedFields.success) {
    return {
      message: 'Failed to submit application. Please check the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  // Here you would typically send the data to your backend, an email service, or a CRM.
  // For this example, we'll just simulate a success response.
  console.log('Partner Application Submitted:', validatedFields.data);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    message: 'Application submitted successfully! Our team will review it and get back to you within 48 hours.',
    success: true,
  };
}
