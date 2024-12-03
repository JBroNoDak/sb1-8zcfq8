// This file will be replaced with an API call
export async function addEmailToSheet(email: string) {
  try {
    // In a production environment, this should call your backend API
    // For demo purposes, we'll simulate a successful subscription
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Email subscription simulated:', email);
        resolve(true);
      }, 1000);
    });
  } catch (error) {
    console.error('Error adding email:', error);
    return false;
  }
}