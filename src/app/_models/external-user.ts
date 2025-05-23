export interface ExternalUser {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  picture: {
    thumbnail: string;
    medium: string;
  };
  location: {
    city: string;
    country: string;
  };
  registered: {
    date: string;
  };
}
