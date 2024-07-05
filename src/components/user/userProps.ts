export interface User {
    id: any;
    socketId: any;
    currentUser: any;
    userAddress: string,
    userType: "Individual" | "Business";    
    coords: { latitude: number; longitude: number } | null;
  }