import React from 'react';
import { Download } from 'lucide-react';
import { getStoredEmails, downloadEmailsCSV, StoredEmail } from '../services/storageService';

export function EmailAdmin() {
  const [emails, setEmails] = React.useState<StoredEmail[]>([]);

  React.useEffect(() => {
    setEmails(getStoredEmails());
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Email Subscriptions</h2>
        <button
          onClick={downloadEmailsCSV}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Date Subscribed</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((entry, index) => (
              <tr 
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4">{entry.email}</td>
                <td className="py-3 px-4">
                  {new Date(entry.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {emails.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No email subscriptions yet.
          </div>
        )}
      </div>
    </div>
  );
}