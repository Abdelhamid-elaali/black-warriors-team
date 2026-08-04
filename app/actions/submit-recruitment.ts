'use server';

import { Resend } from 'resend';
import { RecruitmentEmail } from '@/components/emails/RecruitmentEmail';

export async function submitRecruitmentForm(formData: {
  name: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  message: string;
  profilePicture?: string;
}) {
  try {
    const { name, email, phone, role, experience, message, profilePicture } = formData;

    // Basic validation
    if (!name?.trim() || !email?.trim() || !phone?.trim() || !role?.trim() || !experience?.trim()) {
      return { success: false, error: 'Please fill in all required fields.' };
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY is not configured in environment variables.');
      // Return success gracefully so application feedback works in dev/preview environment
      return { success: true, warning: 'RESEND_API_KEY not set' };
    }

    const resend = new Resend(apiKey);

    // Process attachment if profilePicture is present as base64
    let attachments;
    if (profilePicture && profilePicture.includes(';base64,')) {
      const mimeType = profilePicture.split(';')[0].split(':')[1] || 'image/jpeg';
      const ext = mimeType.split('/')[1] || 'jpeg';
      const base64Data = profilePicture.split(',')[1];
      
      const safeName = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      attachments = [
        {
          filename: `game-profile-${safeName}.${ext}`,
          content: base64Data,
        },
      ];
    }

    const { data, error } = await resend.emails.send({
      from: 'Black Warriors Recruitment <onboarding@resend.dev>',
      to: 'abdelhamidelaali@gmail.com',
      subject: `New Application: ${role} - ${name}`,
      react: RecruitmentEmail({
        name,
        email,
        phone,
        role,
        experience,
        message,
        hasProfilePicture: !!profilePicture,
      }),
      attachments,
      replyTo: email,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, error: error.message || 'Error sending email.' };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('Server Action Error:', error);
    return { success: false, error: error?.message || 'Failed to submit application. Please try again later.' };
  }
}
