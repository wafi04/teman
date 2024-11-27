import { useState } from "react";
import { Inventory, ProductVariant } from "../types/products";

interface UseCartReturn {
  selectedSize: string | null;
  quantity: number;
  handleSizeChange: (size: string) => void;
  handleQuantityChange: (newQuantity: number) => void;
  getStockForSize: (size: string) => number;
}

export function useCart(product: ProductVariant): UseCartReturn {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const getStockForSize = (size: string): number => {
    if (!product.inventories) return 0; // Jika inventories tidak ada, stok adalah 0.
    const stockItem = product.inventories.find(
      (item: Inventory) => item.size === size
    );
    return stockItem ? stockItem.quantity : 0; // Jika ukuran tidak ditemukan, stok adalah 0.
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setQuantity(1); // Reset kuantitas saat ukuran berubah.
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (!selectedSize) return; // Tidak dapat mengubah kuantitas tanpa ukuran yang dipilih.

    const maxStock = getStockForSize(selectedSize);
    const adjustedQuantity = Math.max(1, Math.min(newQuantity, maxStock));
    setQuantity(adjustedQuantity); // Pastikan kuantitas berada dalam rentang yang valid.
  };

  return {
    selectedSize,
    quantity,
    handleSizeChange,
    handleQuantityChange,
    getStockForSize,
  };
}
