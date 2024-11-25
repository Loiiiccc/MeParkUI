
import useSWR from "swr";
import { Vehicle } from "../models/vehicle";

export function useGetVehicles(){
    return useSWR<Vehicle[]>("/vehicle");
}