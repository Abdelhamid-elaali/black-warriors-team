import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Img,
} from '@react-email/components';
import * as React from 'react';

interface RecruitmentEmailProps {
  name: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  message: string;
}

export const RecruitmentEmail = ({
  name,
  email,
  phone,
  role,
  experience,
  message,
}: RecruitmentEmailProps) => {
  const previewText = `New Recruitment Application from ${name} - ${role}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>BLACK WARRIORS</Heading>
            <Text style={subheading}>New Recruitment Application</Text>
          </Section>

          <Section style={contentSection}>
            <Text style={text}>
              <strong style={label}>Applicant Name:</strong> {name}
            </Text>
            <Text style={text}>
              <strong style={label}>Email Address:</strong> {email}
            </Text>
            <Text style={text}>
              <strong style={label}>Phone Number:</strong> {phone}
            </Text>
            
            <Hr style={divider} />
            
            <Text style={text}>
              <strong style={label}>Position Applied For:</strong> {role}
            </Text>
            <Text style={text}>
              <strong style={label}>Competitive Experience:</strong> {experience}
            </Text>
            
            <Hr style={divider} />
            
            <Text style={label}>Tell Us About Yourself:</Text>
            <Text style={messageBox}>
              {message || "No additional message provided."}
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              This email was automatically generated from the Black Warriors recruitment form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default RecruitmentEmail;

const main = {
  backgroundColor: '#0a0a0a',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
};

const header = {
  textAlign: 'center' as const,
  paddingBottom: '30px',
};

const heading = {
  color: '#eab308', /* Tailwind yellow-500 */
  fontSize: '28px',
  fontWeight: 'bold',
  letterSpacing: '2px',
  margin: '0 0 10px 0',
  textTransform: 'uppercase' as const,
};

const subheading = {
  color: '#a3a3a3', /* Tailwind neutral-400 */
  fontSize: '16px',
  margin: '0',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
};

const contentSection = {
  backgroundColor: '#171717', /* Tailwind neutral-900 */
  border: '1px solid #262626', /* Tailwind neutral-800 */
  borderRadius: '8px',
  padding: '30px',
};

const text = {
  color: '#d4d4d4', /* Tailwind neutral-300 */
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 12px 0',
};

const label = {
  color: '#eab308', /* Tailwind yellow-500 */
  fontWeight: '600',
};

const divider = {
  borderColor: '#262626', /* Tailwind neutral-800 */
  margin: '24px 0',
};

const messageBox = {
  backgroundColor: '#0a0a0a',
  borderLeft: '4px solid #eab308',
  borderRadius: '4px',
  color: '#d4d4d4',
  fontSize: '15px',
  lineHeight: '24px',
  padding: '16px',
  margin: '12px 0 0 0',
  whiteSpace: 'pre-wrap' as const,
};

const footer = {
  paddingTop: '30px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#525252', /* Tailwind neutral-600 */
  fontSize: '12px',
  margin: '0',
};
