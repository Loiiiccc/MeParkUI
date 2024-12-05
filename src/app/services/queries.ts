
import useSWR from "swr";
import { Vehicle } from "../models/vehicle";
import { Parking } from "../models/parking";
import { User } from "../models/user";
import { addParkingDTO } from '../models/addParkingDTO';


///Vehicles Queries------------------------------------------------
export function useGetVehicles(){
    return useSWR<Vehicle[]>("/vehicle");
}


///Parkings Queries------------------------------------------------

export function useGetParkings(){
    return useSWR<Parking[]>("/parking");
}

export function useCreateParking(){
    return useSWR<addParkingDTO>("/parking")
}


///Users Queries------------------------------------------------
export function useGetUsers(){
    return useSWR<User[]>("/user")
}