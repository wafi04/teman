import { ShoppingCart } from "lucide-react";
import { userGetCheckout } from "../../api/order/order";
import { LoadingOverlay } from "../../components/ui/LoadingOverlay";
import { HeaderDashboard } from "./components/Header";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { DetailedCartItems } from "./dialog/Details_Cart_items";

export function DashboardCheckout() {
  const { data, error, isLoading } = userGetCheckout();

  if (isLoading) {
    return <LoadingOverlay />;
  }

  // Calculate total items and total amount
  const totalItems =
    data?.reduce((sum, order) => sum + order.order_items.length, 0) || 0;

  return (
    <div className="p-6 space-y-6 h-[80vh] overflow-y-auto">
      <HeaderDashboard
        title="Checkout"
        subTitle="Products yang sudah di checkout">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{totalItems} Items</p>
        </div>
      </HeaderDashboard>

      <div className="mt-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-6">
          {!data || data.length === 0 ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12 bg-gray-50 rounded-lg">
              <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <p className="text-xl text-muted-foreground">
                Your cart is empty
              </p>
              <Button className="mt-4" variant="outline">
                Continue Shopping
              </Button>
            </motion.div>
          ) : (
            data.map((order) => (
              <DetailedCartItems key={order.id} order={order} />
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
