import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRegistration } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { RegistrationsColumns } from "@/pages/RegistrationsColumns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { RegistrationForm } from "@/pages/RegistrationForm";

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
  const navigate = useNavigate();
  
  useEffect(() => {
    const registrationData = getRegistrations();
    setRegistrations(registrationData);
  }, []);

  const handleRowClick = (registration: IRegistration) => {
    navigate(`/registrations/${registration.id}`);
  };

  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveRegistration = (registration: IRegistration) => {
    setRegistrations(prevRegistrations => [registration, ...prevRegistrations]);
    setIsAddModalOpen(false);
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
      
      {isAddModalOpen && (
        <RegistrationForm
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveRegistration}
        />
      )}
    </div>
  );
}
