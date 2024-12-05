"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useCreateParking, useGetParkings } from "@/app/services/queries";
import { Parking } from "@/app/models/parking";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { axiosInstance } from "@/app/utils/fetcher";
import { z } from "zod";

///GETTING DATA
export default function Parkings() {
  const parkingQuery = useGetParkings();
  const parking = parkingQuery.data || []; // Access the data property

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    capacity: 0,
  });

  const handleUpdateInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateParking = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(formData);
    setFormData({ name: "", address: "", capacity: 0 });
    await axiosInstance.post("/parking", { name: formData.name, address: formData.address, capacity: formData.capacity });
    /* mutate(); */
  };

  return (
    <div className="container mx-auto py-15">
      <div className="list-label">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Parkings list
        </h1>
      </div>
      <div className="align-content-end p-4">
        <Dialog>
          <DialogTrigger asChild>
            {/* <Button variant="outline">Edit Profile</Button> */}
            <Button variant="outline">Create Parking</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a new Parking</DialogTitle>
              <DialogDescription>
                Add the new parking informations. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateParking} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleUpdateInputValue}
                  defaultValue=""
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleUpdateInputValue}
                  defaultValue=""
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="capacity" className="text-right">
                  Capacity
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleUpdateInputValue}
                  defaultValue=""
                  className="col-span-3"
                />
              </div>
            </form>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleCreateParking}
                form="parking-form"
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable columns={columns} data={parking} />
    </div>
  );
}

///COLUMS
export const columns: ColumnDef<Parking>[] = [
  /* {
    accessorKey: "id",
    header: "#",
  }, */
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "actions",
    header: "Actions",
  },
];

///DATA TABLE
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      {/* <div className="align-content-end p-4">
        <Button variant="outline" onClick={addParkingBtn} >Button</Button>
      </div> */}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
