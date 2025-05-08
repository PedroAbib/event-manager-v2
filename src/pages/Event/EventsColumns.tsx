"use client"

import { ColumnDef } from "@tanstack/react-table";
import { IEvent } from "../../types";
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

export const EventsColumns: ColumnDef<IEvent>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <SortableHeader column={column} title="Title" />,
    enableHiding: false,
  },
  {
    accessorKey: "dateFrom",
    header: ({ column }) => <SortableHeader column={column} title="Start Date" />,
    cell: ({ row }) => {
      const dateFrom = row.getValue('dateFrom') as Date;
      
      const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }).format(date);
      };
      
      return formatDate(dateFrom);
    }
  },
  {
    accessorKey: "dateTo",
    header: "End Date",
    cell: ({ row }) => {
      const dateTo = row.original.dateTo as Date | undefined;
      
      if (!dateTo) return "N/A";
      
      const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }).format(date);
      };
      
      return formatDate(dateTo);
    }
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      
      let variant: 'default' | 'secondary' | 'destructive' | 'outline';
      let className = '';
      
      switch(status) {
        case 'ongoing':
          variant = 'default';
          className = 'bg-green-700 hover:bg-green-800 text-white';
          break;
        case 'coming-soon':
          variant = 'secondary';
          className = 'bg-blue-500 hover:bg-blue-600 text-white';
          break;
        case 'finished':
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
