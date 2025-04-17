import React, { useState } from "react";
import {
  Pencil,
  Trash2,
  CheckCircle2,
  Search,
  ArrowUp,
  ArrowDown,
  FileQuestion,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const OrdersTable = ({
  orders,
  handleEditExistingOrder,
  formatDate,
  handleCompleteOrder,
  handleDeleteClick,
}) => {
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (key) => {
    if (sortKey === key) {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else if (sortOrder === "desc") {
        setSortKey(null);
        setSortOrder("asc");
      }
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const search = filterText.toLowerCase();
    const matchesSearch =
      order.id.toString().includes(search) ||
      order.userName.toLowerCase().includes(search) ||
      order.userEmail.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "all" ? true : order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortKey) return 0;
    let aValue = a[sortKey];
    let bValue = b[sortKey];

    if (sortKey === "createdAt") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    return 0;
  });

  const statusColorClass = (status) => {
    switch (status) {
      case "completed":
        return "text-green-500 dark:text-green-400 font-semibold";
      case "processing":
        return "text-blue-500 dark:text-blue-300 font-semibold";
      case "pending":
        return "text-yellow-600 dark:text-yellow-300 font-semibold";
      default:
        return "text-foreground";
    }
  };

  const showNoData =
    orders.length === 0 || (orders.length > 0 && filteredOrders.length === 0);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <Input
            placeholder="Search orders"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full sm:max-w-sm"
          />
        </div>
        <div className="flex w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => handleSort("id")}
              className="cursor-pointer select-none"
            >
              ID{" "}
              {sortKey === "id" &&
                (sortOrder === "asc" ? (
                  <ArrowUp className="inline w-3 h-3" />
                ) : (
                  <ArrowDown className="inline w-3 h-3" />
                ))}
            </TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Product</TableHead>
            <TableHead
              onClick={() => handleSort("quantity")}
              className="cursor-pointer select-none"
            >
              Quantity{" "}
              {sortKey === "quantity" &&
                (sortOrder === "asc" ? (
                  <ArrowUp className="inline w-3 h-3" />
                ) : (
                  <ArrowDown className="inline w-3 h-3" />
                ))}
            </TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Delivery</TableHead>
            <TableHead className="min-w-[90px]">Status</TableHead>
            <TableHead
              onClick={() => handleSort("createdAt")}
              className="cursor-pointer select-none"
            >
              Created{" "}
              {sortKey === "createdAt" &&
                (sortOrder === "asc" ? (
                  <ArrowUp className="inline w-3 h-3" />
                ) : (
                  <ArrowDown className="inline w-3 h-3" />
                ))}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {showNoData ? (
            <TableRow>
              <TableCell colSpan={9}>
                <div className="flex flex-col items-center justify-center py-10 opacity-70">
                  <FileQuestion className="w-10 h-10 mb-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {orders.length === 0
                      ? "No orders found."
                      : "No orders match your filters."}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            sortedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  <div>{order.userName}</div>
                  <div className="text-xs text-muted-foreground">
                    {order.userEmail}
                  </div>
                </TableCell>
                <TableCell>{order.productName}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.paymentMethod.replace("_", " ")}</TableCell>
                <TableCell>{order.deliveryMethod.replace("_", " ")}</TableCell>
                <TableCell>
                  <span className={statusColorClass(order.status)}>
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditExistingOrder(order)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  {order.status !== "completed" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCompleteOrder(order.id)}
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(order)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500 dark:text-red-400" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
