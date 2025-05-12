import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { IEvent } from "@/types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Users, Calendar as CalendarIcon2, MapPin } from "lucide-react";

export function Home() {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock data for metrics
  const metrics = [
    { title: "Total Events", value: 12, icon: <CalendarIcon2 className="h-8 w-8 text-blue-500" /> },
    { title: "Total Registrations", value: 248, icon: <Users className="h-8 w-8 text-green-500" /> },
    { title: "Upcoming Events", value: 5, icon: <CalendarIcon className="h-8 w-8 text-orange-500" /> },
  ];
  
  // Mock data for upcoming events
  const upcomingEvents: IEvent[] = [
    {
      id: '1',
      title: 'Tech Conference 2024',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070',
      dateFrom: new Date('2024-06-15'),
      dateTo: new Date('2024-06-17'),
      location: 'San Francisco Convention Center',
      status: 'coming-soon',
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
      title: 'AI & Machine Learning Workshop',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070',
      dateFrom: new Date('2024-05-10'),
      dateTo: new Date('2024-05-12'),
      location: 'Seattle Convention Center',
      status: 'coming-soon',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-20'),
    },
    {
      id: '1',
      title: 'Tech Conference 2024',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070',
      dateFrom: new Date('2024-06-15'),
      dateTo: new Date('2024-06-17'),
      location: 'San Francisco Convention Center',
      status: 'coming-soon',
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
      title: 'AI & Machine Learning Workshop',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070',
      dateFrom: new Date('2024-05-10'),
      dateTo: new Date('2024-05-12'),
      location: 'Seattle Convention Center',
      status: 'coming-soon',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-20'),
    },
    {
      id: '1',
      title: 'Tech Conference 2024',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070',
      dateFrom: new Date('2024-06-15'),
      dateTo: new Date('2024-06-17'),
      location: 'San Francisco Convention Center',
      status: 'coming-soon',
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
      title: 'AI & Machine Learning Workshop',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070',
      dateFrom: new Date('2024-05-10'),
      dateTo: new Date('2024-05-12'),
      location: 'Seattle Convention Center',
      status: 'coming-soon',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-20'),
    },
    {
      id: '1',
      title: 'Tech Conference 2024',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070',
      dateFrom: new Date('2024-06-15'),
      dateTo: new Date('2024-06-17'),
      location: 'San Francisco Convention Center',
      status: 'coming-soon',
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
      title: 'AI & Machine Learning Workshop',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070',
      dateFrom: new Date('2024-05-10'),
      dateTo: new Date('2024-05-12'),
      location: 'Seattle Convention Center',
      status: 'coming-soon',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-20'),
    },
  ];
  
  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'coming-soon': return 'bg-blue-500';
      case 'ongoing': return 'bg-green-500';
      case 'finished': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Welcome to Event Management System
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Manage your events and registrations efficiently
        </p>
      </div>
      
      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="flex items-center">
              <div className="mr-4">
                {metric.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{metric.title}</p>
                <h3 className="text-3xl font-bold">{metric.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Main Content Section */}
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-5'} gap-5`}>
        {/* Upcoming Events Section - 3/5 width on desktop */}
        <div className={`${isMobile ? '' : 'col-span-3'} space-y-4`}>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Upcoming Events</h2>
          <div className="space-y-4 flex flex-col gap-2">
            {upcomingEvents.map(event => (
              <Link to={`/events/${event.id}`} key={event.id}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3 h-40 rounded-md overflow-hidden pl-4">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="w-full md:w-2/3 px-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>
                            {formatDate(event.dateFrom)}
                            {event.dateTo && ` - ${formatDate(event.dateTo)}`}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Calendar Section - 2/5 width on desktop with sticky positioning */}
        <div className={`${isMobile ? '' : 'col-span-2'}`}>
          <div className={`${isMobile ? '' : 'sticky top-4'}`}>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Calendar</h2>
            <Card>
              <CardContent className="p-4 flex justify-center">
                <div className="scale-120 transform-gpu origin-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}