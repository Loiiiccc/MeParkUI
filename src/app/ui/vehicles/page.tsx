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


import { useGetVehicles } from "@/app/services/queries";
import { Vehicle } from "@/app/models/vehicle";

///GETTING DATA
export default function Vehicles() {
  const vehiclesQuery = useGetVehicles();
  const vehicles = vehiclesQuery.data || []; // Access the data property

  return (
    
    <div className="container mx-auto py-15">
      <div className="list-label"><h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Vehicles list</h1></div>
      <DataTable columns={columns} data={vehicles} />
    </div>
  );
}

///COLUMS
export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "registrationPlate",
    header: "Registration Plate",
  },
  {
    accessorKey: "mark",
    header: "Mark",
  },
  {
    accessorKey: "model",
    header: "Models",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "owner",
    header: "Owner",
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
