import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IEvent } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { EventsColumns } from "./EventsColumns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { EventForm } from "@/pages/Event/EventForm";
import { toast } from "@/components/ui/sonner";

function getEvents(): IEvent[] {
  return [
    {
      id: '1',
      title: 'Tech Conference 2024',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070',
      dateFrom: new Date('2024-06-15'),
      dateTo: new Date('2024-06-17'),
      location: 'San Francisco Convention Center',
      status: 'ongoing',
      createdAt: new Date('2023-12-01'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      title: 'Digital Marketing Summit',
      imageUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e4?q=80&w=2070',
      dateFrom: new Date('2024-04-22'),
      dateTo: new Date('2024-04-24'),
      location: 'New York Hilton',
      status: 'coming-soon',
      createdAt: new Date('2023-11-15'),
      updatedAt: new Date('2024-01-10'),
    },
    {
      id: '3',
      title: 'Startup Pitch Night',
      imageUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=2073',
      dateFrom: new Date('2024-03-30'),
      dateTo: new Date('2024-03-31'),
      location: 'Austin Innovation Hub',
      status: 'ongoing',
      createdAt: new Date('2023-12-20'),
      updatedAt: new Date('2024-01-05'),
    },
    {
      id: '4',
      title: 'Web3 Developer Workshop',
      imageUrl: 'https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=2070',
      dateFrom: new Date('2024-05-10'),
      dateTo: new Date('2024-05-12'),
      location: 'Miami Tech Center',
      status: 'coming-soon',
      createdAt: new Date('2023-11-30'),
      updatedAt: new Date('2024-01-20'),
    },
    {
      id: '5',
      title: 'UX Design Conference',
      imageUrl: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071',
      dateFrom: new Date('2024-07-05'),
      dateTo: new Date('2024-07-07'),
      location: 'Seattle Design Hub',
      status: 'ongoing',
      createdAt: new Date('2023-12-10'),
      updatedAt: new Date('2024-01-12'),
    },
    {
      id: '6',
      title: 'Data Science Symposium',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
      dateFrom: new Date('2024-08-20'),
      dateTo: new Date('2024-08-22'),
      location: 'Boston University',
      status: 'finished',
      createdAt: new Date('2023-11-25'),
      updatedAt: new Date('2024-01-18'),
    },
    {
      id: '7',
      title: 'AI Ethics Forum',
      imageUrl: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=2069',
      dateFrom: new Date('2024-09-12'),
      dateTo: new Date('2024-09-14'),
      location: 'Toronto Convention Center',
      status: 'coming-soon',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-02-10'),
    },
    {
      id: '8',
      title: 'Cybersecurity Summit',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070',
      dateFrom: new Date('2024-10-18'),
      dateTo: new Date('2024-10-20'),
      location: 'Chicago Tech Campus',
      status: 'coming-soon',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-02-20'),
    }
  ];
}

export function Events() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const eventData = getEvents();
    setEvents(eventData);
  }, []);

  const handleRowClick = (event: IEvent) => {
    navigate(`/events/${event.id}`);
  };

  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveEvent = (event: IEvent) => {
    // Check if it's an update or new event
    const isUpdate = events.some(e => e.id === event.id);
    
    if (isUpdate) {
      setEvents(prevEvents => 
        prevEvents.map(e => e.id === event.id ? event : e)
      );
      toast.success("Event updated", {
        description: `"${event.title}" has been updated successfully.`,
      });
    } else {
      setEvents(prevEvents => [event, ...prevEvents]);
      toast.success("Event created", {
        description: `"${event.title}" has been created successfully.`,
      });
    }
    
    setIsAddModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Events</h1>
        <Button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white"
        >
          <PlusCircle className="h-4 w-4" />
          New Event
        </Button>
      </div>
      <DataTable 
        columns={EventsColumns} 
        data={events} 
        onRowClick={handleRowClick}
        searchColumn="title"
        searchPlaceholder="Search events..."
      />
      
      <EventForm
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveEvent}
      />
    </div>
  );
}


