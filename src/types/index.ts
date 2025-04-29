export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  capacity: number;
  price: number;
  status: 'draft' | 'ongoing' | 'finished';
  createdAt: Date;
  updatedAt: Date;
}

export interface Registration {
  id: string;
  fullName: string;
  tagName: string;
  cpf: string;
  email: string;
  phoneNumber: string;
  address: string;
  postalCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Participant {
  id: string;
  eventId: string;
  attendeeId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  attendeeDetails: {
    name: string;
    email: string;
    phone?: string;
  };
}
