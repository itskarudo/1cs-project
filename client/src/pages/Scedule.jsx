import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
  PlusIcon,
} from "@radix-ui/react-icons";

import axios from "axios";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const deleteSchedule = async (id, setSchedules) => {
  const url = `http://localhost:3000/schedules/${id}`;
  axios.delete(url).then(() => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
    toast.success("Schedule deleted successfully!");
  });
};

const mapPromoToGroups = (promoName) => {
  switch (promoName) {
    case "1CPI":
      return 12;
    case "2CPI":
      return 12;
    case "1CS":
      return 8;
    case "2CS":
      return 12;
    case "3CS":
      return 12;
    default:
      return 0;
  }
};

export const columns = (setSchedules) => [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <CaretSortIcon className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-4 capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "Promotion",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Promotion
          <CaretSortIcon className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-4 capitalize">{row.getValue("Promotion")}</div>
    ),
  },
  {
    accessorKey: "Speciality",
    header: "Speciality",
    cell: ({ row }) => (
      <div className="ml-4 capitalize">{row.getValue("Speciality")}</div>
    ),
  },
  {
    accessorKey: "seances",
    header: "Total Sessions",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("seances"));

      return <div className="ml-4  ">{amount}</div>;
    },
  },
  {
    accessorKey: "groupes",
    header: "Total Groups",
    cell: ({ row }) => {
      const amount = mapPromoToGroups(row.getValue("Promotion"));

      return <div className="ml-4">{amount}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="mr-2 text-right ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4  " />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end ">
              <DropdownMenuLabel className="text-blue-500">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => deleteSchedule(row.getValue("id"), setSchedules)}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={`/schedule/${row.getValue("id")}`}>
                  View Schedule
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={`/Seance/${row.getValue("id")}`}>Add Session</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [schedules, setSchedules] = React.useState([]);

  React.useEffect(() => {
    const url = "http://localhost:3000/schedules";

    axios.get(url).then(async ({ data }) => {
      let seances = await Promise.all(
        data.schedules.map((s) => {
          const url = `http://localhost:3000/schedules/${s.id}/seances`;
          return axios.get(url);
        }),
      );

      seances = seances.map((s) => s.data.seances);

      const ss = data.schedules.map((s, i) => ({
        ...s,
        seances: seances[i].length,
      }));
      setSchedules(ss);
    });
  }, []);

  const table = useReactTable({
    data: schedules,
    columns: columns(setSchedules),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <Separator className="mx-4" />
      <Breadcrumb className="mx-20 ">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="text-blue-500">Schedule</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="px-20 ">
        <div className="flex items-center justify-between pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">All Schedules</h2>
          </div>
          <div className="space-x-4">
            <Link to="/Add-Schedule">
              <Button
                variant="outline"
                className="text-black border border-blue-500 hover:bg-blue-700 hover:border-blue-700 hover:text-white"
              >
                Add Schedule <PlusIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-blue-500 text-white border border-blue-500 hover:bg-blue-700 hover:border-blue-700"
                >
                  Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="rounded-md border ">
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
                            header.getContext(),
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
                          cell.getContext(),
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
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground text-blue-500">
            {table.getFilteredRowModel().rows.length} row(s) .
          </div>
          <div className="space-x-2">
            <Button
              className="bg-blue-500 text-white border border-blue-500 hover:bg-blue-700 hover:border-blue-700"
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              className="bg-blue-500 text-white border border-blue-500 hover:bg-blue-700 hover:border-blue-700"
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
