import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IEvent, IParticipant } from '@/types';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Edit,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EventForm } from './EventForm';
import { DataTable } from '@/components/ui/data-table';
import { ParticipantsColumns } from '../ParticipantsColumns';

export function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // TODO: Replace with actual API call
  const event: IEvent = {
    id: id ?? '1',
    title: 'Tech Conference 2024',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070',
    dateFrom: new Date('2024-06-15'),
    dateTo: new Date('2024-06-17'),
    location: 'San Francisco Convention Center',
    status: 'ongoing',
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-01-15'),
  };

  // TODO: Replace with actual API call
  const participants: IParticipant[] = [
    {
      id: '1',
      eventId: event.id,
      registrationId: 'person1',
      registrationDate: new Date('2024-01-15'),
      isPaid: true,
      fullName: 'John Doe',
      tagName: 'JOHN DOE',
      workField: 'Software Development',
      cpf: '123.456.789-00',
      email: 'john@example.com',
      phoneNumber: '+1 234-567-8900',
      address: '123 Main St, San Francisco, CA',
      postalCode: '94105',
      status: 'confirmed'
    },
    {
      id: '2',
      eventId: event.id,
      registrationId: 'person2',
      registrationDate: new Date('2024-01-20'),
      isPaid: false,
      fullName: 'Jane Smith',
      tagName: 'JANE SMITH',
      workField: 'UX Design',
      cpf: '987.654.321-00',
      email: 'jane@example.com',
      phoneNumber: '+1 234-567-8901',
      address: '456 Market St, San Francisco, CA',
      postalCode: '94103',
      status: 'pending'
    },
    {
      id: '3',
      eventId: event.id,
      registrationId: 'person3',
      registrationDate: new Date('2024-01-18'),
      isPaid: true,
      fullName: 'Michael Johnson',
      tagName: 'MICHAEL JOHNSON',
      workField: 'Data Science',
      cpf: '456.789.123-00',
      email: 'michael@example.com',
      phoneNumber: '+1 234-567-8902',
      address: '789 Howard St, San Francisco, CA',
      postalCode: '94107',
      status: 'confirmed'
    },
    {
      id: '4',
      eventId: event.id,
      registrationId: 'person4',
      registrationDate: new Date('2024-01-25'),
      isPaid: false,
      fullName: 'Emily Davis',
      tagName: 'EMILY DAVIS',
      workField: 'Marketing',
      cpf: '789.123.456-00',
      email: 'emily@example.com',
      phoneNumber: '+1 234-567-8903',
      address: '101 California St, San Francisco, CA',
      postalCode: '94111',
      status: 'cancelled'
    },
    {
      id: '5',
      eventId: event.id,
      registrationId: 'person5',
      registrationDate: new Date('2024-01-22'),
      isPaid: true,
      fullName: 'Robert Wilson',
      tagName: 'ROBERT WILSON',
      workField: 'Project Management',
      cpf: '321.654.987-00',
      email: 'robert@example.com',
      phoneNumber: '+1 234-567-8904',
      address: '555 Mission St, San Francisco, CA',
      postalCode: '94105',
      status: 'confirmed'
    },
    {
      id: '6',
      eventId: event.id,
      registrationId: 'person6',
      registrationDate: new Date('2024-01-28'),
      isPaid: false,
      fullName: 'Sarah Brown',
      tagName: 'SARAH BROWN',
      workField: 'Human Resources',
      cpf: '654.987.321-00',
      email: 'sarah@example.com',
      phoneNumber: '+1 234-567-8905',
      address: '888 Brannan St, San Francisco, CA',
      postalCode: '94103',
      status: 'pending'
    }
  ];

  const handleEditEvent = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteEvent = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteEvent = () => {
    // TODO: Implement actual delete API call
    console.log('Deleting event:', event.id);
    navigate('/events');
  };

  const handleUpdateEvent = (updatedEvent: IEvent) => {
    // TODO: Implement actual update API call
    console.log('Updated event:', updatedEvent);
    setIsEditModalOpen(false);
    // Later, update the state or refetch the event
  };

  // Helper function to render status badge (I may move this to a separate file)
  const renderStatusBadge = (status: string) => {
    let variant: 'default' | 'secondary' | 'destructive' | 'outline';
    let className = '';
    
    switch(status) {
      case 'ongoing':
        variant = 'default';
        className = 'bg-green-500 hover:bg-green-600 text-white';
        break;
      case 'coming-soon':
        variant = 'secondary';
        className = 'bg-blue-500 hover:bg-blue-600 text-white';
        break;
      case 'finished':
        variant = 'outline';
        className = 'border-gray-400 text-gray-600';
        break;
      default:
        variant = 'default';
    }
    
    const formattedStatus = status
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return (
      <Badge variant={variant} className={className}>
        {formattedStatus}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate('/events')}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleEditEvent}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDeleteEvent}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex gap-4 items-start">
              {event.imageUrl && (
                <div className="rounded-md overflow-hidden h-50 w-100">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className='flex flex-col gap-2'>
                <CardTitle className="text-2xl gap-2 flex items-center">{event.title}{renderStatusBadge(event.status)}</CardTitle>
                <CardDescription className='flex flex-col gap-14'>
                  <div className='flex-col gap-2 flex'>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(event.dateFrom).toLocaleDateString()}
                      {event.dateTo && ` - ${new Date(event.dateTo).toLocaleDateString()}`}
                    </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>{participants.length} participants</span>
                    </div>
                  </div>

                  <div className='flex justify-between'>
                    <div>Created: {new Date(event.createdAt).toLocaleDateString()}</div>
                    <div>Updated: {new Date(event.updatedAt).toLocaleDateString()}</div>
                  </div>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Participants Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between m-0">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Participants
          </h2>
          <Button className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Add Participant
          </Button>
        </div>
        
        <DataTable
          columns={ParticipantsColumns}
          data={participants} 
          searchColumn="fullName"
          searchPlaceholder="Search participants..."
        />
      </div>

      {/* Edit Event Modal */}
      {isEditModalOpen && (
        <EventForm
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateEvent}
          initialData={event}
          title="Edit Event"
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the event
              "{event.title}" and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteEvent} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
