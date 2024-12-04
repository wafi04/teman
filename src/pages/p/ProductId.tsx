import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductById } from "../../api/products/products.query";
import { Button } from "../../components/ui/button";
import { ProtectedLayout } from "../layouts/AuthLayout";
import { useCart } from "../../hooks/useCart";
import { Inventory, ProductVariant } from "../../types/products";
import { ShoppingCart, Minus, Plus, Heart } from "lucide-react";
import { useCreateCart } from "../../api/order/order";
import { useAuth } from "../../provider/AuthProvider";

export function ProductId() {
  const { id } = useParams();
  const { user } = useAuth();
  const { data, isLoading, error } = useProductById(id as string);
  const add = useCreateCart();
  // Use useMemo to always have a consistent initial variant
  const initialVariant = useMemo(() => {
    return data?.variants && data.variants.length > 0 ? data.variants[0] : null;
  }, [data]);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    initialVariant
  );

  const {
    getStockForSize,
    handleQuantityChange,
    handleSizeChange,
    quantity,
    selectedSize,
  } = useCart(selectedVariant || ({} as ProductVariant));

  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant);
  };

  // Loading and error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading product</div>;
  }

  if (!data) {
    return <div>No product found</div>;
  }

  return (
    <ProtectedLayout title={data.name}>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
            <img
              src={selectedVariant?.image as string}
              alt={data.name}
              className="max-w-full h-auto object-contain"
            />
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{data.name}</h1>

            {/* Variant Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Variant</h3>
              <div className="flex flex-wrap gap-2">
                {data.variants?.map((variant: ProductVariant) => (
                  <Button
                    key={variant.id}
                    variant={
                      selectedVariant?.id === variant.id ? "default" : "outline"
                    }
                    onClick={() => handleVariantSelect(variant)}
                    className="flex items-center gap-2">
                    {variant.color && (
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: variant.color }}
                      />
                    )}
                    {variant.color || "Variant"}
                  </Button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {selectedVariant?.inventories?.map(
                  (inventoryItem: Inventory) => {
                    const isAvailable = inventoryItem.quantity > 0;
                    return (
                      <Button
                        key={inventoryItem.size}
                        variant={
                          selectedSize === inventoryItem.size
                            ? "default"
                            : "outline"
                        }
                        onClick={() => handleSizeChange(inventoryItem.size)}
                        disabled={!isAvailable}
                        className={`
                      ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}
                      relative
                    `}>
                        {inventoryItem.size}
                        {!isAvailable && (
                          <span className="absolute top-0 right-0 text-xs text-red-500">
                            Out
                          </span>
                        )}
                      </Button>
                    );
                  }
                )}
              </div>
            </div>
            {/* Quantity Controls */}
            {selectedSize && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}>
                    <Minus />
                  </Button>
                  <span className="px-4">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= getStockForSize(selectedSize)}>
                    <Plus />
                  </Button>
                </div>
                <span className="text-gray-500">
                  Stock: {getStockForSize(selectedSize)}
                </span>
              </div>
            )}

            {user?.id === data.seller_id ? (
              <Link to={"/dashboard"}>
                <Button className="mt-4">Go to Dashboard</Button>
              </Link>
            ) : (
              // {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button
                  className="flex-1 flex items-center gap-2"
                  disabled={!selectedSize || quantity === 0}
                  onClick={() => {
                    // Pastikan selectedVariant dan selectedSize tersedia
                    if (selectedVariant && selectedSize) {
                      // Cari inventory yang sesuai dengan size yang dipilih
                      const selectedInventory =
                        selectedVariant.inventories?.find(
                          (inv) => inv.size === selectedSize
                        );

                      if (selectedInventory) {
                        add.mutate({
                          variant_id: selectedVariant.id as string,
                          inventory_id: selectedInventory.id as number,
                          quantity: quantity,
                        });
                      }
                    }
                  }}>
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>

                <Button variant="outline" size="icon">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* Product Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{data.description}</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
