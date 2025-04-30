import React from 'react';
import { sendEmail } from '../api/api';
 
function SendEmailPage() {
  const handleSendEmail = async () => {
    try {
      const result = await sendEmail({
        subject: "Test Email",
        body: "Hello, this is a test email!",
        toRecepients: ["smate1@bajajauto.co.in"],
      });
      console.log('Email sent successfully:', result);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
 
  return (
<div>
<h1>Send Email</h1>
<button onClick={handleSendEmail}>Send Email</button>
</div>
  );
}
 
export default SendEmailPage;