const STORAGE_KEYS = {
  EMAILS: 'hashtag-tracker-emails',
} as const;

export interface StoredEmail {
  email: string;
  timestamp: string;
}

export function getStoredEmails(): StoredEmail[] {
  try {
    const storedData = localStorage.getItem(STORAGE_KEYS.EMAILS);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
}

export function storeEmail(email: string): boolean {
  try {
    const emails = getStoredEmails();
    
    // Check for duplicates
    if (emails.some(entry => entry.email === email)) {
      return false;
    }

    const newEmail: StoredEmail = {
      email,
      timestamp: new Date().toISOString(),
    };

    emails.push(newEmail);
    localStorage.setItem(STORAGE_KEYS.EMAILS, JSON.stringify(emails));
    return true;
  } catch (error) {
    console.error('Error storing email:', error);
    return false;
  }
}

export function exportEmailsToCSV(): string {
  const emails = getStoredEmails();
  const csvContent = [
    ['Email', 'Timestamp'],
    ...emails.map(entry => [entry.email, entry.timestamp])
  ].map(row => row.join(',')).join('\n');

  return csvContent;
}

export function downloadEmailsCSV(): void {
  const csvContent = exportEmailsToCSV();
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `hashtag-tracker-emails-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}