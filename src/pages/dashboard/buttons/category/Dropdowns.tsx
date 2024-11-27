import { AlertTriangle, Ellipsis, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDeleteCategory } from "../../../../api/categories/categories.query";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { CategoriesForm } from "../../../../types/categories";
import FormCategories from "../../form/categories/FormCategories";

export function Dropdowns({ initialData }: { initialData: CategoriesForm }) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const deletes = useDeleteCategory();
  const handleOpen = (type: "delete" | "update") => {
    if (type === "update") {
      setOpenUpdate(true);
    } else {
      setOpenDelete(true);
    }
  };

  const handleDelete = () => {
    deletes.mutate(initialData.id as number);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 hover:bg-slate-100 focus-visible:ring-1 focus-visible:ring-slate-300">
            <Ellipsis className="h-4 w-4 text-slate-600" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-20">
          <DropdownMenuItem
            onClick={() => handleOpen("update")}
            className="flex items-center gap-2 py-2 cursor-pointer hover:bg-slate-100">
            <Pencil className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-slate-700">Update</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleOpen("delete")}
            className="flex items-center gap-2 py-2 cursor-pointer hover:bg-slate-100 text-red-600">
            <Trash2 className="h-4 w-4" />
            <span className="text-sm font-medium">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {openUpdate && (
        <Dialog open={openUpdate} onOpenChange={() => setOpenUpdate(false)}>
          <DialogContent>
            <FormCategories initialData={initialData} />
          </DialogContent>
        </Dialog>
      )}
      {openDelete && (
        <Dialog open={openDelete} onOpenChange={() => setOpenDelete(false)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-red-50">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <DialogTitle className="text-lg font-semibold">
                    Delete Category
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-500 mt-1">
                    Are you sure you want to delete "{initialData.name}"? This
                    action cannot be undone.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <DialogFooter className="mt-6">
              <div className="flex gap-2 justify-end w-full">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpenDelete(false)}
                  className="px-4">
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deletes.isPending}
                  className="px-4">
                  {deletes.isPending ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
