'use server';

import { Resend } from 'resend';
import { RecruitmentEmail } from '@/components/emails/RecruitmentEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitRecruitmentForm(formData: {
  name: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  message: string;
}) {
  try {
    const { name, email, phone, role, experience, message } = formData;

    // Basic validation
    if (!name || !email || !phone || !role || !experience) {
      return { success: false, error: 'All fields are required' };
    }

    const { data, error } = await resend.emails.send({
      from: 'Black Warriors Recruitment <onboarding@resend.dev>',
      to: 'abdelhamidelaali@gmail.com',
      subject: `New Application: ${role} - ${name}`,
      react: RecruitmentEmail({ name, email, phone, role, experience, message }),
      replyTo: email,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('Server Action Error:', error);
    return { success: false, error: 'Failed to submit application. Please try again later.' };
  }
}
