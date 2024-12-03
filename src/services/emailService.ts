import { storeEmail } from './storageService';

export interface EmailSubscription {
  email: string;
}

export async function subscribeEmail(email: string): Promise<boolean> {
  try {
    return storeEmail(email);
  } catch (error) {
    console.error('Email subscription error:', error);
    return false;
  }
}