"use client"

import { ColumnDef } from "@tanstack/react-table";
import { IRegistration } from "../types";
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

export const RegistrationsColumns: ColumnDef<IRegistration>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
    enableHiding: false,
  },
  {
    accessorKey: "tagName",
    header: "Tag Name",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortableHeader column={column} title="Registration Date" />,
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date;
      
      const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }).format(date);
      };
      
      return formatDate(date);
    }
  },
];
