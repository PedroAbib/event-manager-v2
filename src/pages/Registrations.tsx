import { useEffect, useState } from "react";
import { IRegistration } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { RegistrationsColumns } from "@/pages/RegistrationsColumns";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { RegistrationForm } from "@/pages/RegistrationForm";
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

function getRegistrations(): IRegistration[] {
  return [
    {
      id: '1',
      fullName: 'John Doe',
      tagName: 'JOHN DOE',
      cpf: '123.456.789-00',
      email: 'john@example.com',
      phoneNumber: '+1 234-567-8900',
      address: '123 Main St, San Francisco, CA',
      postalCode: '94105',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      fullName: 'Jane Smith',
      tagName: 'JANE SMITH',
      cpf: '987.654.321-00',
      email: 'jane@example.com',
      phoneNumber: '+1 234-567-8901',
      address: '456 Market St, San Francisco, CA',
      postalCode: '94103',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '3',
      fullName: 'Michael Johnson',
      tagName: 'MICHAEL JOHNSON',
      cpf: '456.789.123-00',
      email: 'michael@example.com',
      phoneNumber: '+1 234-567-8902',
      address: '789 Howard St, San Francisco, CA',
      postalCode: '94107',
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-18')
    },
    {
      id: '4',
      fullName: 'Emily Davis',
      tagName: 'EMILY DAVIS',
      cpf: '789.123.456-00',
      email: 'emily@example.com',
      phoneNumber: '+1 234-567-8903',
      address: '101 California St, San Francisco, CA',
      postalCode: '94111',
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25')
    },
    {
      id: '5',
      fullName: 'Robert Wilson',
      tagName: 'ROBERT WILSON',
      cpf: '321.654.987-00',
      email: 'robert@example.com',
      phoneNumber: '+1 234-567-8904',
      address: '555 Mission St, San Francisco, CA',
      postalCode: '94105',
      createdAt: new Date('2024-01-22'),
      updatedAt: new Date('2024-01-22')
    },
    {
      id: '6',
      fullName: 'Sarah Brown',
      tagName: 'SARAH BROWN',
      cpf: '654.987.321-00',
      email: 'sarah@example.com',
      phoneNumber: '+1 234-567-8905',
      address: '888 Brannan St, San Francisco, CA',
      postalCode: '94103',
      createdAt: new Date('2024-01-28'),
      updatedAt: new Date('2024-01-28')
    }
  ];
}

export function Registrations() {
  const [registrations, setRegistrations] = useState<IRegistration[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<IRegistration | null>(null);
  
  useEffect(() => {
    const registrationData = getRegistrations();
    setRegistrations(registrationData);
  }, []);

  const handleRowClick = (registration: IRegistration) => {
    setSelectedRegistration(registration);
    setIsEditModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedRegistration(null);
    setIsAddModalOpen(true);
  };

  const handleSaveRegistration = (registration: IRegistration) => {
    if (selectedRegistration) {
      // Update existing registration
      setRegistrations(prevRegistrations => 
        prevRegistrations.map(reg => 
          reg.id === registration.id ? registration : reg
        )
      );
    } else {
      // Add new registration
      setRegistrations(prevRegistrations => [registration, ...prevRegistrations]);
    }
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
    setSelectedRegistration(null);
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedRegistration) {
      setRegistrations(prevRegistrations => 
        prevRegistrations.filter(reg => reg.id !== selectedRegistration.id)
      );
      setIsDeleteDialogOpen(false);
      setIsEditModalOpen(false);
      setSelectedRegistration(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Registrations</h1>
        <Button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white"
        >
          <PlusCircle className="h-4 w-4" />
          New Registration
        </Button>
      </div>
      <DataTable 
        columns={RegistrationsColumns} 
        data={registrations} 
        onRowClick={handleRowClick}
        searchColumn="fullName"
        searchPlaceholder="Search registrations..."
      />
      
      {/* Add Registration Modal */}
      {isAddModalOpen && (
        <RegistrationForm
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveRegistration}
        />
      )}

      {/* Edit Registration Modal */}
      {isEditModalOpen && selectedRegistration && (
        <div>
          <RegistrationForm
            open={isEditModalOpen}
            onClose={handleEditClose}
            onSave={handleSaveRegistration}
            initialData={selectedRegistration}
            title="Edit Registration"
            footer={
              <div className="flex justify-between w-full">
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteClick}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleEditClose}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Edit className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            }
          />
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the registration for {selectedRegistration?.fullName}.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
