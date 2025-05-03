import { useState } from 'react';
import { Event } from '../types';
import { useNavigate } from 'react-router-dom';
import { LuArrowUpDown } from 'react-icons/lu';

interface EventsListProps {
  events: Event[];
}

type SortField = 'title' | 'date' | 'location' | 'capacity' | 'price' | 'status';
type SortDirection = 'asc' | 'desc';

export function EventsList({ events }: EventsListProps) {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedEvents = [...events].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    
    switch (sortField) {
      case 'title':
        return direction * a.title.localeCompare(b.title);
      case 'date':
        return direction * (a.date.getTime() - b.date.getTime());
      case 'location':
        return direction * a.location.localeCompare(b.location);
      case 'capacity':
        return direction * (a.capacity - b.capacity);
      case 'price':
        return direction * (a.price - b.price);
      case 'status':
        return direction * a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const handleEventClick = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  const SortableHeader = ({ field, label }: { field: SortField; label: string }) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <LuArrowUpDown 
          className={`w-4 h-4 ${
            sortField === field 
              ? sortDirection === 'desc'
                ? 'text-red-500'
                : 'text-blue-500'
              : 'text-gray-400'
          }`} 
        />
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <SortableHeader field="title" label="Title" />
            <SortableHeader field="date" label="Date" />
            <SortableHeader field="location" label="Location" />
            <SortableHeader field="capacity" label="Capacity" />
            <SortableHeader field="price" label="Price" />
            <SortableHeader field="status" label="Status" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
          {sortedEvents.map((event) => (
            <tr
              key={event.id}
              onClick={() => handleEventClick(event.id)}
              className="hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                {event.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {new Date(event.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {event.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {event.capacity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                ${event.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 py-1 rounded text-sm ${
                  event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                  event.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
