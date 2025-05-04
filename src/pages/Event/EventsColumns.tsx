"use client"

import { ColumnDef } from "@tanstack/react-table";
import { IEvent } from "../../types";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const SortableHeader = ({ column, title }: { column: any; title: string }) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
    >
      {title}
      <ArrowUpDown className={`ml-2 h-4 w-4 ${
        column.getIsSorted() === 'asc'
          ? 'text-blue-500'
          : column.getIsSorted() === 'desc'
            ? 'text-red-500'
            : 'text-gray-400'
      }`} />
    </Button>
  );
};

export const EventsColumns: ColumnDef<IEvent>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <SortableHeader column={column} title="Title" />,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <SortableHeader column={column} title="Date" />,
    cell: ({ row }) => {
      const date = row.getValue('date') as Date;
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date);
    }
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price)

      return <div className="text-left font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
  },
];
