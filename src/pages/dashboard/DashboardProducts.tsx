import { Button } from "../../components/ui/button";
import { DataTable } from "../../components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { HeaderDashboard } from "./components/Header";
import { FormProducts } from "./form/products/FormProducts";
import {
  useDeleteProduct,
  useDeleteVariants,
  useGetProducts,
} from "../../api/products/products.query";
import { Product, ProductVariant } from "../../types/products";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { ChevronDown, ChevronRight, Ellipsis } from "lucide-react";
import { useState } from "react";
import { DialogAddVariants, Dialogupdate } from "./dialog/products";
import VariantsTable from "./dialog/variantsTable";

export function DashboardProducts() {
  const { data: products, isLoading } = useGetProducts();

  const columns: ColumnDef<Product>[] = [
    {
      id: "expander",
      header: () => null,
      cell: ({ row }) => {
        return row.getCanExpand() ? (
          <Button
            variant="ghost"
            onClick={row.getToggleExpandedHandler()}
            className="p-0 w-6 h-6">
            {row.getIsExpanded() ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        ) : null;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      id: "variants",
      header: "Variants",
      cell: ({ row }) => {
        const variantsCount = row.original.variants?.length || 0;
        return <span>{variantsCount} variant(s)</span>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const [openUpdate, setOpenUpdate] = useState(false);
        const [openVariants, setOpenVariants] = useState(false);
        const deleteProduct = useDeleteProduct();

        const product = row.original;

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Ellipsis className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setOpenVariants(true)}>
                  Add variants
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpenUpdate(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => deleteProduct.mutate(product.id)}
                  className="text-red-600">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dialogs */}
            <DialogAddVariants
              open={openVariants}
              setOpen={setOpenVariants}
              productId={product.id}
            />
            <Dialogupdate
              open={openUpdate}
              setOpen={setOpenUpdate}
              product={product}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="p-6 space-y-6 h-[80vh] overflow-y-auto">
      <HeaderDashboard
        title="Products"
        subTitle="Manage your product inventory">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Product</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new product to your
                inventory.
              </DialogDescription>
            </DialogHeader>
            <FormProducts />
          </DialogContent>
        </Dialog>
      </HeaderDashboard>

      {isLoading ? (
        <div className="text-center">Loading products...</div>
      ) : (
        <>
          <DataTable
            columns={columns}
            data={products}
            getRowCanExpand={() => true}
            renderSubComponent={({ row }) =>
              row.original.variants && row.original.variants.length > 0 ? (
                <VariantsTable variants={row.original.variants} />
              ) : (
                <div className="pl-8 pr-6 py-3 bg-slate-50 text-gray-500">
                  No variants available for this product
                </div>
              )
            }
          />
        </>
      )}
    </div>
  );
}
