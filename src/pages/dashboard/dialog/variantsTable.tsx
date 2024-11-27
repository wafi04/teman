import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { useDeleteVariants } from "../../../api/products/products.query";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { ProductVariant } from "../../../types/products";
import { FormVariants } from "../form/products/FormVariants";

const VariantsTable = ({ variants }: { variants: ProductVariant[] }) => {
  return (
    <div className="pl-8 pr-6 py-3 bg-slate-50 rounded-md">
      <h4 className="font-medium mb-3">Product Variants</h4>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Color</th>
            <th className="text-left py-2">Price</th>
            <th className="text-left py-2">SKU</th>
            <th className="text-left py-2">Inventory</th>
            <th className="text-left py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => (
            <tr key={variant.id} className="border-b">
              <td className="py-2">{variant.color}</td>
              <td className="py-2">${variant.price}</td>
              <td className="py-2">{variant.sku || "N/A"}</td>
              <td className="py-2">
                {variant.inventories?.map((inv) => (
                  <div key={inv.id} className="text-sm text-gray-600">
                    Size: {inv.size}, Qty: {inv.quantity}
                  </div>
                ))}
              </td>
              <td>
                <HandleOther variants={variant} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VariantsTable;

export function HandleOther({ variants }: { variants: ProductVariant }) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openVariants, setOpenVariants] = useState(false);
  const deleteVariants = useDeleteVariants();
  const handleOpen = (type = "delete" || "update") =>
    type === "update" ? setOpenUpdate(true) : setOpenVariants(true);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="rounded-full  p-2  m-2">
            <Ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuItem onClick={() => handleOpen("update")}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => deleteVariants.mutate(variants.id as string)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {openUpdate && (
        <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Variants</DialogTitle>
              <DialogDescription>Update your variants</DialogDescription>
            </DialogHeader>
            <FormVariants
              initialData={{
                ...variants,
                id: variants.id,
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
