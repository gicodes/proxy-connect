export interface ConnectProps {
  coords: { latitude: number; longitude: number } | null;
  online: boolean;
  username: string;
  userType: "Admin" | "Business" | "Individual" | "Demo" | null;
  socketId: string | null;
}

export type Coordinates = {
  latitude: number;
  longitude: number;
} | null;