import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const data = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
  { id: 4, name: "David", age: 40 },
  { id: 5, name: "Eve", age: 45 },
  { id: 6, name: "Frank", age: 50 },
  { id: 7, name: "Grace", age: 55 },
  { id: 8, name: "Henry", age: 60 },
  { id: 9, name: "Ivy", age: 65 },
  { id: 10, name: "Jack", age: 70 },
];

const itemsPerPage = 3;

const TableWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationPrevious
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
          <PaginationLink
            isActive={currentPage === 1}
            onClick={() => paginate(1)}
          >
            1
          </PaginationLink>
          <PaginationLink
            isActive={currentPage === 2}
            onClick={() => paginate(2)}
          >
            2
          </PaginationLink>
          <PaginationLink
            isActive={currentPage === 3}
            onClick={() => paginate(3)}
          >
            3
          </PaginationLink>
          <PaginationNext
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
          />
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TableWithPagination;
