import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const ConfirmDeleteDialog = ({
  modalOpen,
  handleCancelDelete,
  orderToDelete,
  handleConfirmDelete,
}) => {
  return (
    <Dialog
      open={modalOpen}
      onOpenChange={(open) => !open && handleCancelDelete()}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Delete Order</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <strong>
              order #{orderToDelete?.id} {orderToDelete?.productName}
            </strong>
            .
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
