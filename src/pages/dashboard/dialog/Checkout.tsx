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
import { BANK } from "../../../constanst";

export type CheckoutForm = {
  shipping_address: string;
  payment_method: string;
  bank_name?: string;
  virtual_account?: string;
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
    bank_name: undefined,
    virtual_account: undefined,
  });

  const checkoutCart = useCheckout();

  const generateRandomVirtualAccount = () => {
    const randomDigits = Array.from({ length: 12 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    return `${randomDigits.slice(0, 4)}-${randomDigits.slice(
      4,
      8
    )}-${randomDigits.slice(8)}`;
  };

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
      bank_name: undefined,
      virtual_account: value === "transfer_bank" ? undefined : "",
    }));
  };

  const handleBankChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      bank_name: value,
      virtual_account: generateRandomVirtualAccount(),
    }));
  };

  const handleCheckout = () => {
    // Validate form data
    if (!formData.shipping_address || !formData.payment_method) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Additional validation for bank transfer
    if (formData.payment_method === "transfer_bank") {
      if (!formData.bank_name || !formData.virtual_account) {
        toast.error("Please select a bank and enter virtual account");
        return;
      }
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
          <div className=" items-center space-y-2">
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
          <div className="items-center space-y-2">
            <label htmlFor="payment_method" className="text-right">
              Payment Method
            </label>
            <Select
              value={formData.payment_method}
              onValueChange={handlePaymentMethodChange}>
              <SelectTrigger className="">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="transfer_bank">Transfer Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bank Transfer Additional Fields */}
          {formData.payment_method === "transfer_bank" && (
            <>
              <div className=" items-center space-y-2">
                <label className="text-right">Select Bank</label>
                <div className="col-span-3 grid grid-cols-4 gap-2">
                  {BANK.map((bank) => (
                    <div
                      key={bank.nama}
                      className={`cursor-pointer p-2 border rounded-md text-center 
                        ${
                          formData.bank_name === bank.nama
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200"
                        }
                      `}
                      onClick={() => handleBankChange(bank.nama)}>
                      <img
                        src={bank.image}
                        alt={bank.nama}
                        className="w-full h-10 object-contain "
                      />
                      <p className="text-xs mt-1">{bank.nama}</p>
                    </div>
                  ))}
                </div>
              </div>

              {formData.bank_name && (
                <div className="items-center space-y-2">
                  <label htmlFor="virtual_account" className="text-right">
                    Virtual Account
                  </label>
                  <Input
                    id="virtual_account"
                    name="virtual_account"
                    placeholder={`Enter ${formData.bank_name} Virtual Account`}
                    className="col-span-3"
                    value={formData.virtual_account || ""}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </>
          )}
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
