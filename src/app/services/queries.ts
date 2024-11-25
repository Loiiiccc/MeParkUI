
import useSWR from "swr";
import { Vehicle } from "../models/vehicle";

export function useGetVehicles(){
    return useSWR<Array<Vehicle>>("/vehicle");
}