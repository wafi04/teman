import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { toast } from "sonner";
import { useCheckout } from "../../../api/order/order";

export type CheckoutForm = {
  shipping_address: string;
  payment_method: string;
};

export function ModalCheckout({
  length,
  total,
}: {
  length: number;
  total: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<CheckoutForm>({
    shipping_address: "",
    payment_method: "",
  });

  const checkoutCart = useCheckout();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      payment_method: value,
    }));
  };

  const handleCheckout = () => {
    // Validate form data
    if (!formData.shipping_address || !formData.payment_method) {
      toast.error("Please fill in all required fields");
      return;
    }

    checkoutCart.mutate(formData, {
      onSuccess: () => {
        toast.success("Checkout successful");
        setIsOpen(false);
      },
      onError: (error) => {
        toast.error("Checkout failed", {
          description: error.message,
        });
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full"
          disabled={length === 0}
          onClick={() => setIsOpen(true)}>
          {length > 0 ? `Checkout (${length} items)` : "Checkout"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Checkout</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="shipping_address" className="text-right">
              Shipping Address
            </label>
            <Input
              id="shipping_address"
              name="shipping_address"
              placeholder="Enter shipping address"
              className="col-span-3"
              value={formData.shipping_address}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="payment_method" className="text-right">
              Payment Method
            </label>
            <Select
              value={formData.payment_method}
              onValueChange={handlePaymentMethodChange}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit_card">Credit Card</SelectItem>
                <SelectItem value="debit_card">Debit Card</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="digital_wallet">Digital Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCheckout} disabled={checkoutCart.isPending}>
            {checkoutCart.isPending ? "Processing..." : "Complete Checkout"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
