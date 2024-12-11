import { ShoppingCart, MapPin, CreditCard, Package } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { FormatPrice } from "../../../utils/FormatPrice";
import { Order } from "../../../types/order";

interface CartItemsProps {
  order: Order;
  isAdminView?: boolean;
}

export function DetailedCartItems({
  order,
  isAdminView = false,
}: CartItemsProps) {
  console.log(order);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "processing":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "shipped":
        return "bg-green-50 text-green-600 border-green-200";
      case "delivered":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      {/* Order Header */}
      <CardHeader className="bg-gray-50 p-4 border-b border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="h-6 w-6 text-muted-foreground" />
            <h2 className="text-xl font-bold text-gray-800">
              {isAdminView
                ? `Order by  ${order.user && order.user.name}`
                : `Order #${order.id}`}
            </h2>
            <Badge
              variant="outline"
              className={`${getStatusColor(order.status)} 
                capitalize px-3 py-1 rounded-full text-xs font-semibold`}>
              {order.status}
            </Badge>
          </div>
          <p className="text-sm text-gray-500">
            Ordered on {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>
      </CardHeader>

      <CardContent className="p-4 md:p-6">
        {/* Order Details Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* Shipping Information */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <h4 className="font-semibold text-gray-700">Shipping Address</h4>
            </div>
            <p className="text-sm text-gray-600">
              {order.shipping_address || "No address provided"}
            </p>
          </div>

          {/* Payment Information */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <h4 className="font-semibold text-gray-700">Payment Method</h4>
            </div>
            <p className="text-sm text-gray-600 capitalize">
              {order.payment_method || "No payment method"} - {order?.bank_name}
            </p>
            <p className="text-sm text-gray-600 capitalize">
              {order?.virtual_account}
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Package className="h-5 w-5 text-muted-foreground" />
              <h4 className="font-semibold text-gray-700">Order Summary</h4>
            </div>
            <div className="text-sm text-gray-600">
              <p>Total Items: {order.order_items.length}</p>
              <p className="font-medium text-gray-800">
                Total Amount:{" "}
                {FormatPrice(parseFloat(order.total_amount), "IDR")}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Order Items
          </h3>
          <div className="space-y-3">
            {order.order_items.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
                {/* Product Image */}
                <img
                  src={item.product_variant.image}
                  alt={item.product_variant.product.name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />

                {/* Product Details */}
                <div className="flex-grow">
                  <h4 className="font-semibold text-gray-800">
                    {item.product_variant.product.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Variant: {item.product_variant.color}
                  </p>
                </div>

                {/* Quantity and Price */}
                <div className="text-right">
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="font-semibold text-gray-800">
                    {FormatPrice(parseFloat(item.price), "IDR")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
