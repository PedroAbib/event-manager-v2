import { useParams, useNavigate } from 'react-router-dom';
import { Event, Participant } from '../types';
import { LuArrowLeft } from 'react-icons/lu';
import { ParticipantsList } from '../components/ParticipantsList';

export function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // TODO: Replace with actual API call
  const event: Event = {
    id: id ?? '1',
    title: 'Tech Conference 2024',
    description: 'Annual technology conference',
    date: new Date('2024-06-15'),
    location: 'Convention Center',
    capacity: 500,
    price: 299.99,
    status: 'ongoing',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // TODO: Replace with actual API call
  const participants: Participant[] = [
    {
      id: '1',
      eventId: event.id,
      attendeeId: 'att1',
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date(),
      attendeeDetails: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234-567-8900'
      }
    },
    {
      id: '2',
      eventId: event.id,
      attendeeId: 'att2',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      attendeeDetails: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1 234-567-8901'
      }
    },
    {
      id: '1',
      eventId: event.id,
      attendeeId: 'att1',
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date(),
      attendeeDetails: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234-567-8900'
      }
    },
    {
      id: '2',
      eventId: event.id,
      attendeeId: 'att2',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      attendeeDetails: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1 234-567-8901'
      }
    },
    {
      id: '1',
      eventId: event.id,
      attendeeId: 'att1',
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date(),
      attendeeDetails: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234-567-8900'
      }
    },
    {
      id: '2',
      eventId: event.id,
      attendeeId: 'att2',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      attendeeDetails: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1 234-567-8901'
      }
    },
    {
      id: '1',
      eventId: event.id,
      attendeeId: 'att1',
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date(),
      attendeeDetails: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234-567-8900'
      }
    },
    {
      id: '2',
      eventId: event.id,
      attendeeId: 'att2',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      attendeeDetails: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1 234-567-8901'
      }
    },
    {
      id: '1',
      eventId: event.id,
      attendeeId: 'att1',
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date(),
      attendeeDetails: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234-567-8900'
      }
    },
    {
      id: '2',
      eventId: event.id,
      attendeeId: 'att2',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      attendeeDetails: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1 234-567-8901'
      }
    },
    {
      id: '1',
      eventId: event.id,
      attendeeId: 'att1',
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date(),
      attendeeDetails: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234-567-8900'
      }
    },
    {
      id: '2',
      eventId: event.id,
      attendeeId: 'att2',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      attendeeDetails: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1 234-567-8901'
      }
    },
  ];

  return (
    <div>
      <button
        onClick={() => navigate('/events')}
        className="flex items-center mb-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors cursor-pointer"
      >
        <LuArrowLeft className="mr-2" />
        Back to Events
      </button>

      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        {event.title}
      </h1>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Event Details
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {event.description}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Location: {event.location}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Capacity: {event.capacity} attendees
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Price: ${event.price}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Status Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Status: {event.status}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Date: {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Created: {new Date(event.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Last Updated: {new Date(event.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Participants
      </h2>
      <ParticipantsList participants={participants} />
    </div>
  );
}
