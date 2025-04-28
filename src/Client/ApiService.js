import { BASE_URL } from '../constants';

 
export async function sendEmail({ subject, body, toRecepients, ccRecepients = [], bccRecepients = [], attachments = {} }) {
  console.log('BASE_URL',BASE_URL);
  
  const response = await fetch(`${BASE_URL}/email/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subject,
      contentType: 'text/plain',
      toRecepients,
      ccRecepients,
      bccRecepients,
      attachments,
      body,
    }),
  });
 
  if (!response.ok) {
    throw new Error('Failed to send email');
  }
 
  return await response.json();
}