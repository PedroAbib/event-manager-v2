import { useEffect, useState } from "react";
import { IEvent } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { EventsColumns } from "./EventsColumns";

function getEvents(): IEvent[] {
    return [
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
}

export function Events() {
    const [events, setEvents] = useState<IEvent[]>([]);
    
    useEffect(() => {
        const eventData = getEvents();
        setEvents(eventData);
        console.log(eventData);
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Events</h1>
            <DataTable columns={EventsColumns} data={events} />
        </div>
    );
}
