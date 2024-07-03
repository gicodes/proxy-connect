import { Rider } from "@/components/routes/connect/ryderType";

export function ridersOffline(data: any) {
    data.filter((rider: Rider) => !rider.online);
  }