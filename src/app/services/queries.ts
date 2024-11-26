
import useSWR from "swr";
import { Vehicle } from "../models/vehicle";
import { Parking } from "../models/parking";
import { User } from "../models/user";

export function useGetVehicles(){
    return useSWR<Vehicle[]>("/vehicle");
}

export function useGetParkings(){
    return useSWR<Parking[]>("/parking");
}

export function useGetUsers(){
    return useSWR<User[]>("/user")
}