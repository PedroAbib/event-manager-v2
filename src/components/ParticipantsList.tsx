import { Participant } from '../types';

interface ParticipantsListProps {
  participants: Participant[];
}

export function ParticipantsList({ participants }: ParticipantsListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                {participant.attendeeDetails.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {participant.attendeeDetails.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {participant.attendeeDetails.phone || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 py-1 rounded text-sm ${
                  participant.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  participant.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {participants.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No participants registered yet.
        </div>
      )}
    </div>
  );
}