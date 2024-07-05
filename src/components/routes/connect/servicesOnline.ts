import { Rider } from "@/components/routes/connect/serviceType";

export function servicesOnline(data: any) {
  data.filter((rider: Rider) => rider.online);
}

export function servicesOffline(data: any) {
  data.filter((rider: Rider) => !rider.online);
}