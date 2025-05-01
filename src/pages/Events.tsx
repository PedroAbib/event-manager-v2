import { useState } from 'react';
import { EventsList } from '../components/EventsList';
import { Event } from '../types';
import { LuSearch, LuPlus } from 'react-icons/lu';

export function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    description: '',
    date: new Date(),
    location: '',
    capacity: 0,
    price: 0,
    status: 'draft'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log('New event:', newEvent);
    setIsModalOpen(false);
    setNewEvent({
      title: '',
      description: '',
      date: new Date(),
      location: '',
      capacity: 0,
      price: 0,
      status: 'draft'
    });
  };

  // Temporary mock data
  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Tech Conference 2024',
      description: 'Annual technology conference featuring the latest innovations in AI and cloud computing',
      date: new Date('2024-06-15'),
      location: 'San Francisco Convention Center',
      capacity: 500,
      price: 299.99,
      status: 'ongoing',
      createdAt: new Date('2023-12-01'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      title: 'Digital Marketing Summit',
      description: 'Expert insights on SEO, social media, and content marketing strategies',
      date: new Date('2024-04-22'),
      location: 'New York Hilton',
      capacity: 300,
      price: 199.99,
      status: 'draft',
      createdAt: new Date('2023-11-15'),
      updatedAt: new Date('2024-01-10'),
    },
    {
      id: '3',
      title: 'Startup Pitch Night',
      description: 'Emerging startups showcase their innovative solutions to investors',
      date: new Date('2024-03-30'),
      location: 'Austin Innovation Hub',
      capacity: 150,
      price: 49.99,
      status: 'ongoing',
      createdAt: new Date('2023-12-20'),
      updatedAt: new Date('2024-01-05'),
    },
    {
      id: '4',
      title: 'Web3 Developer Workshop',
      description: 'Hands-on workshop on blockchain development and smart contracts',
      date: new Date('2024-05-10'),
      location: 'Miami Tech Center',
      capacity: 100,
      price: 399.99,
      status: 'draft',
      createdAt: new Date('2023-11-30'),
      updatedAt: new Date('2024-01-20'),
    },
    {
      id: '5',
      title: 'UX Design Conference',
      description: 'Latest trends and best practices in user experience design',
      date: new Date('2024-07-05'),
      location: 'Seattle Design Hub',
      capacity: 250,
      price: 249.99,
      status: 'ongoing',
      createdAt: new Date('2023-12-10'),
      updatedAt: new Date('2024-01-12'),
    },
    {
      id: '6',
      title: 'Data Science Symposium',
      description: 'Advanced analytics, machine learning, and data visualization techniques',
      date: new Date('2024-08-20'),
      location: 'Boston University',
      capacity: 400,
      price: 349.99,
      status: 'finished',
      createdAt: new Date('2023-11-25'),
      updatedAt: new Date('2024-01-18'),
    }
  ];

  const filteredEvents = mockEvents.filter(event => {
    const searchLower = searchTerm.toLowerCase();
    return (
      event.title.toLowerCase().includes(searchLower) ||
      event.location.toLowerCase().includes(searchLower) ||
      event.status.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
          Events
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
          >
            <LuPlus className="w-5 h-5 mr-2" />
            New Event
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              Create New Event
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newEvent.date ? new Date(newEvent.date).toISOString().split('T')[0] : ''}
                    onChange={(e) => setNewEvent({ ...newEvent, date: new Date(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={newEvent.capacity}
                    onChange={(e) => setNewEvent({ ...newEvent, capacity: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    value={newEvent.price}
                    onChange={(e) => setNewEvent({ ...newEvent, price: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={newEvent.status}
                  onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value as Event['status'] })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="finished">Finished</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <EventsList events={filteredEvents} />

      {filteredEvents.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No events found matching your search.
        </div>
      )}
    </div>
  );
}
