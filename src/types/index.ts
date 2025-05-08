export interface IEvent {
  id: string;
  title: string;
  imageUrl: string;
  dateFrom: Date;
  dateTo?: Date;
  location: string;
  status: 'coming-soon' | 'ongoing' | 'finished';
  createdAt: Date;
  updatedAt: Date;
}

export interface IRegistration {
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

export interface IParticipant {
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
