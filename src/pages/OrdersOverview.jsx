import React, { useState } from "react";
import { useOrders } from "../context/ordersContext";
import { useNavigate } from "react-router-dom";
import { OrdersTable } from "../components/OrdersOverview/OrdersTable";
import { useBreakpoints } from "../hooks/useBreakpoints";
import { Plus } from "lucide-react";
import { ConfirmDeleteDialog } from "../components/OrdersOverview/Dialogs/ConfirmDeleteDialog";
import { EditOrderModal } from "../components/OrdersOverview/Dialogs/EditOrderModal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OrdersOverview = () => {
  const navigate = useNavigate();
  const { orders, editOrder, completeOrder, deleteOrder } = useOrders();
  const [editingOrder, setEditingOrder] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const { downMd } = useBreakpoints();

  const handleOpenModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditingOrder(null);
  };

  const handleEditExistingOrder = (order) => {
    setEditingOrder(order);
    handleOpenModal();
  };

  const handleSaveEditedOrder = () => {
    editOrder(editingOrder);
    handleCloseEditModal();
  };

  const handleCompleteOrder = (orderId) => {
    completeOrder(orderId);
  };

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteOrder(orderToDelete.id);
    setDeleteConfirmOpen(false);
    setOrderToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setOrderToDelete(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "green";
      case "processing":
        return "blue";
      case "pending":
        return "orange";
      default:
        return "black";
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-2xl font-semibold m-0">Orders</h3>
          <Button variant="default" onClick={() => navigate("/new-order")}>
            <Plus className="h-4 w-4" />
            {downMd ? "Order" : "Add New Order"}
          </Button>
        </CardHeader>
        <CardContent>
          <OrdersTable
            downMd={downMd}
            orders={orders}
            handleEditExistingOrder={handleEditExistingOrder}
            handleCompleteOrder={handleCompleteOrder}
            getStatusColor={getStatusColor}
            handleDeleteClick={handleDeleteClick}
            formatDate={formatDate}
          />

          <EditOrderModal
            downMd={downMd}
            modalOpen={editModalOpen}
            handleCloseModal={handleCloseEditModal}
            editingOrder={editingOrder}
            setEditingOrder={setEditingOrder}
            handleSaveEditedOrder={handleSaveEditedOrder}
          />

          <ConfirmDeleteDialog
            modalOpen={deleteConfirmOpen}
            handleCancelDelete={handleCancelDelete}
            orderToDelete={orderToDelete}
            handleConfirmDelete={handleConfirmDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersOverview;
