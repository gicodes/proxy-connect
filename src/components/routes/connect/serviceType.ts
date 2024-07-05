export interface Rider {
  id: string;
  online: boolean;
  username: string;
  firstName: string;
  lastName: string;
  position: { lat: number; lng: number };
}
