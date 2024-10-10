export type LoginResponse = {
  token: string;
};

export type Patient = Address & {
  id?: number;
  firstName: string;
  lastName: string;
  note?: string;
  phoneNumber?: string;
};

export type Address = {
  country?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
  zipCode?: string;
  latitude?: string;
  longitude?: string;
};

export type OpenStreeMapResponse = {
  lat: string;
  lon: string;
  display_name: string;
  address: {
    city: string;
    country: string;
    house_number?: string;
    road?: string;
    postcode?: string;
  };
};

export type Appointment = {
  id?: number;
  patient: Patient;
  title: string;
  startDate: number;
  endDate: number;
  note: number;
};

export type AllAppointment = {
  patientId: number;
  title: string;
  startDate: number;
  endDate: number;
  note: number;
};

export type Profil = {
  id: number;
  firstName: string;
  lastName: string;
  profession: string;
  email: string;
};
