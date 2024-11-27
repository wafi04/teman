import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Product, ProductsForm } from "../../../types/products";
import { FormProducts } from "../form/products/FormProducts";
import { FormVariants } from "../form/products/FormVariants";

export function Dialogupdate({
  open,
  setOpen,
  product,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
          <DialogDescription>Update product details</DialogDescription>
        </DialogHeader>
        <FormProducts
          initialData={{
            categoryId: product.category_id,
            description: product.description,
            name: product.name,
            id: product.id,
            seller_id: product.seller_id,
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export function DialogAddVariants({
  open,
  productId,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productId: string;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Variants</DialogTitle>
          <DialogDescription>Create Variants</DialogDescription>
        </DialogHeader>
        <FormVariants productId={productId} />
      </DialogContent>
    </Dialog>
  );
}
