export interface User {
  id: any;
  socketId: any;
  currentUser: any; // current user??
  userAddress: string; // ??
  userType: "Individual" | "Business";
  coords: { latitude: number; longitude: number } | null; // >>>> should be extended
}