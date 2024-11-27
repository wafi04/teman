import { toast } from "sonner";
import { clearCart, useCheckout } from "../../../../api/order/order";
// import { useCheckoutCart, useClearCart } from "../../../../api/cart/cart.query";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { FormatPrice } from "../../../../utils/FormatPrice";
import { ModalCheckout } from "../../dialog/Checkout";
// import { FormatPrice } from "../../../../utils/format_Price";

export function OrderSUmmary({
  length,
  total,
}: {
  length: number;
  total: number;
}) {
  const checkoutCart = useCheckout();
  const ClearCart = clearCart();

  const handleClear = () => {
    ClearCart.mutate(undefined, {
      onSuccess: () => {
        toast.success("Cart cleared successfully");
      },
      onError: (error) => {
        toast.error("Failed to clear cart", {
          description: error.message,
        });
      },
    });
  };

  //   const handleCheckout = () => {
  //     checkoutCart.mutate(undefined, {
  //       onSuccess: () => {
  //         toast.success("Checkout successful");
  //       },
  //       onError: (error) => {
  //         toast.error("Checkout failed", {
  //           description: error.message,
  //         });
  //       },
  //     });
  //   };

  return (
    <div className="lg:col-span-1">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-lg">Order Summary</h3>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>
                {total ? FormatPrice(total, "IDR") : FormatPrice(0, "IDR")}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{FormatPrice(0, "IDR")}</span>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>
                {total ? FormatPrice(total, "IDR") : FormatPrice(0, "IDR")}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <ModalCheckout length={length} total={total} />

            {length > 0 && (
              <Button
                variant="outline"
                className="w-full"
                disabled={ClearCart.isPending}
                onClick={handleClear}>
                {ClearCart.isPending ? "Clearing..." : "Clear Cart"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
