import { HeaderDashboard } from "./components/Header";
import { LoadingOverlay } from "../../components/ui/LoadingOverlay";
import { getCart, removeItemsFromCart } from "../../api/order/order";
import { Card, CardContent } from "../../components/ui/card";
import { FormatPrice } from "../../utils/FormatPrice";
import { Button } from "../../components/ui/button";
import { Trash2, ShoppingCart } from "lucide-react";
import { CartItemsProps } from "../../types/order";
import { OrderSUmmary } from "./components/cart/OrderSummary";
import { motion } from "framer-motion";

export function DashboardCart() {
  const { data, error, isLoading } = getCart();

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="p-6 space-y-6 h-[80vh] overflow-y-auto">
      <HeaderDashboard
        title="Shopping Cart"
        subTitle="Review your items before checkout">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {data?.order_items.length || 0} Items
          </p>
        </div>
      </HeaderDashboard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-6">
          {data?.order_items.length === 0 ? (
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
            data?.order_items.map((item) => (
              <CartItems key={item.id} items={item} onRemove={() => {}} />
            ))
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}>
          <OrderSUmmary
            length={data?.order_items.length || 0}
            total={parseFloat(data?.total_amount as string) || 0}
          />
        </motion.div>
      </div>
    </div>
  );
}

export function CartItems({ items }: CartItemsProps) {
  const remove = removeItemsFromCart();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="group">
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-24 h-24 rounded-lg overflow-hidden bg-gray-50 self-center">
              <img
                src={items.product_variant.image}
                alt={items.product_variant.product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="font-semibold text-lg">
                    {items.product_variant.product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {items.product_variant.product.category.name} •
                    {items.product_variant.color}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Size: {items.inventory.size}
                  </p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <p className="font-semibold text-lg">
                    {FormatPrice(parseFloat(items.subtotal), "IDR")}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    Quantity: {items.quantity}
                  </span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={remove.isPending}
                  onClick={() => remove.mutate(items.id)}
                  className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  {remove.isPending ? "removing..." : "remove"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default DashboardCart;
