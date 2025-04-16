"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, FileText, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

// Example invoice data
const invoices = [
  {
    id: "INV-001",
    date: "2024-03-15",
    amount: "$299.00",
    status: "Paid",
    description: "Premium Portfolio Plan - Monthly",
  },
  {
    id: "INV-002",
    date: "2024-02-15",
    amount: "$299.00",
    status: "Paid",
    description: "Premium Portfolio Plan - Monthly",
  },
  {
    id: "INV-003",
    date: "2024-01-15",
    amount: "$299.00",
    status: "Paid",
    description: "Premium Portfolio Plan - Monthly",
  },
];

const Invoices = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Invoices</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <FileText className="mr-2 h-4 w-4" />
          Generate Invoice
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search invoices..."
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <Button variant="outline" className="border-gray-700 text-white">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="rounded-lg border border-gray-800 bg-gray-900">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-gray-800/50">
              <TableHead className="text-gray-400">Invoice ID</TableHead>
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-gray-400">Amount</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Description</TableHead>
              <TableHead className="text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id} className="border-gray-800 hover:bg-gray-800/50">
                <TableCell className="text-white">{invoice.id}</TableCell>
                <TableCell className="text-gray-300">{invoice.date}</TableCell>
                <TableCell className="text-white">{invoice.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-green-900/20 text-green-400 border-green-900"
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-300">{invoice.description}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Invoices;
