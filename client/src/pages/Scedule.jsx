

import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"


import {

  
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator";

const data = [
  {
    id: "promo1",
    promotion: "1CP",
    spécialité: "MI",
    séance: 10,
    groupes:12
  },
  {
    id: "promo2",
    promotion: "2CP",
    spécialité: "MI",
    séance: 10,
    groupes:12
  },
  {
    id: "promo3",
    promotion: "1CS",
    spécialité: "INFO",
    séance: 10,
    groupes:8
  },
  {
    id: "promo4",
    promotion: "2CS",
    spécialité: "SIW",
    séance: 10,
    groupes:12
  },
  {
    id: "promo4",
    promotion: "2CS",
    spécialité: "ISI",
    séance: 10,
    groupes:12
  },
  {
    id: "promo4",
    promotion: "2CS",
    spécialité: "IASD",
    séance: 10,
    groupes:12
  },
  {
    id: "promo5",
    promotion: "3CS",
    spécialité: "SIW",
    séance: 10,
    groupes:12
  },
  {
    id: "promo5",
    promotion: "3CS",
    spécialité: "ISI",
    séance: 10,
    groupes:12
  },
  {
    id: "promo5",
    promotion: "3CS",
    spécialité: "IASD",
    séance: 10,
    groupes:12
  },
]



export const columns = [
 
  {
    accessorKey: "promotion",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Promotion
          <CaretSortIcon className="ml-2 h-4 w-4 " />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="ml-4 capitalize">{row.getValue("promotion")}</div>
    ),
  },
  {
    accessorKey: "spécialité",
    header: "Spécialité",
    cell: ({ row }) => <div className="ml-4 capitalize">{row.getValue("spécialité")}</div>,
  },
  {
    accessorKey: "séance",
    header: "Séance Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("séance"))

    

      return <div className="ml-4  ">{amount}</div>
    },
  },
  {
    accessorKey: "groupes",
    header: "Groupes Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("groupes"))

    

      return <div className="ml-4">{amount}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const promotion = row.original

      return (
        
        <div className="mr-2 text-right ">
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 border border-blue-500 ">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4  "  />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end " className="border border-blue-500">
            <DropdownMenuLabel className="text-blue-500">Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(promotion.id)}
            >
              Copy Promo ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem >View Schedule</DropdownMenuItem>
            <DropdownMenuItem ><Link to="/Seance">Edit Schedule</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      )
    },
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
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
  })

  return (
    
     <div>
      
        <Separator className="mx-4"/>
        <Breadcrumb className="mx-20 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href="/Schedule">Aceuil</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        
        <BreadcrumbItem>
          <BreadcrumbPage className="text-blue-500">Schedule</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div className="px-20 ">
      <div className="flex items-center pb-4">
      <div className="mr-auto">
            <h2 className="text-2xl font-bold tracking-tight">All promos!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of all promotions!
            </p>
          </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto bg-blue-500 text-white border border-blue-500 hover:bg-blue-700 hover:border-blue-700">
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
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
                            header.getContext()
                          )}
                    </TableHead>
                  )
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground text-blue-500">
         
          {table.getFilteredRowModel().rows.length} row(s) .
        </div>
        <div className="space-x-2">
          <Button className="bg-blue-500 text-white border border-blue-500 hover:bg-blue-700 hover:border-blue-700"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button className="bg-blue-500 text-white border border-blue-500 hover:bg-blue-700 hover:border-blue-700"
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
    
  )
}
