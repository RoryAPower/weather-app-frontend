import { AxiosResponse } from "axios";
import http from "@/services/api/http";

export const getWeather = (
  lat: number,
  long: number
): Promise<AxiosResponse> => {
  return http.get("/api/weather", { params: { lat: lat, long: long } });
};
