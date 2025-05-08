"use client"

import { ColumnDef } from "@tanstack/react-table";
import { IParticipant } from "../types";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

// TODO: This is a temporary solution. I may change it later.
export const ParticipantsColumns: ColumnDef<IParticipant>[] = [
  {
    accessorKey: "attendeeDetails.name",
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
    enableHiding: false,
  },
  {
    accessorKey: "attendeeDetails.email",
    header: "Email",
  },
  {
      accessorKey: "status",
      header: ({ column }) => <SortableHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        
        let variant: 'default' | 'secondary' | 'destructive' | 'outline';
        let className = '';
        
        switch(status) {
          case 'confirmed':
            variant = 'default';
            className = 'bg-green-700 hover:bg-green-800 text-white';
            break;
          case 'pending':
            variant = 'secondary';
            className = 'bg-blue-500 hover:bg-blue-600 text-white';
            break;
          case 'cancelled':
            variant = 'secondary';
            className = '';
            break;
          default:
            variant = 'default';
        }
        
        const formattedStatus = status
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        return (
          <Badge variant={variant} className={className}>
            {formattedStatus}
          </Badge>
        );
      }
    },
];