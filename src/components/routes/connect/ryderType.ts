export interface Rider {
  id: string;
  online: boolean;
  username: string;
  firstName: string;
  position: { lat: number; lng: number };
}
