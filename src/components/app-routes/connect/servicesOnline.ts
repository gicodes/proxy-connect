import { Rider } from "@/components/app-routes/connect/connectProps";

export function servicesOnline(data: any) {
  data.filter((rider: Rider) => rider.online);
}

export function servicesOffline(data: any) {
  data.filter((rider: Rider) => !rider.online);
}