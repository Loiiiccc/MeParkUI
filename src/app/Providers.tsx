"use client"
import fetcher from "../app/utils/fetcher"
import React from "react";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

export default function Providers ({children} : {children : ReactNode}) {
    return <SWRConfig value={{fetcher}}>{children}</SWRConfig>;
}