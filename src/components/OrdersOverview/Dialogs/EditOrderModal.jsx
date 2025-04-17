import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

export const EditOrderModal = ({
  modalOpen,
  handleCloseModal,
  editingOrder,
  setEditingOrder,
  handleSaveEditedOrder,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty },
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: editingOrder,
  });

  useEffect(() => {
    if (editingOrder) {
      reset(editingOrder);
    }
  }, [editingOrder, reset]);

  if (!editingOrder) return null;

  const onSubmit = (data) => {
    setEditingOrder({ ...editingOrder, ...data });
    handleSaveEditedOrder();
  };

  return (
    <Dialog
      open={modalOpen}
      onOpenChange={(open) => !open && handleCloseModal()}
    >
      <DialogContent className="max-w-xl" style={{ padding: "24px" }}>
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
          <DialogDescription>
            Update the order details below and click "Save Changes" to apply.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Customer Name</Label>
              <Input
                {...register("userName")}
                defaultValue={editingOrder.userName}
              />
            </div>

            <div>
              <Label>Customer Email</Label>
              <Input
                type="email"
                {...register("userEmail")}
                defaultValue={editingOrder.userEmail}
              />
            </div>

            <div>
              <Label>Product</Label>
              <Input value={editingOrder.productName} disabled />
            </div>

            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                min={1}
                {...register("quantity", { valueAsNumber: true })}
                defaultValue={editingOrder.quantity}
              />
            </div>

            <div>
              <Label>Payment Method</Label>
              <Select
                value={watch("paymentMethod")}
                onValueChange={(value) =>
                  setValue("paymentMethod", value, { shouldDirty: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Delivery Method</Label>
              <Select
                value={watch("deliveryMethod")}
                onValueChange={(value) =>
                  setValue("deliveryMethod", value, { shouldDirty: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select delivery" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="express">Express</SelectItem>
                  <SelectItem value="pickup">Pickup</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label>Status</Label>
              <Select
                value={watch("status")}
                onValueChange={(value) =>
                  setValue("status", value, { shouldDirty: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              variant="secondary"
              type="button"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!isDirty}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
