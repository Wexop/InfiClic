export type LoginResponse = {
  token: string;
};

export type Patient = Address & {
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
