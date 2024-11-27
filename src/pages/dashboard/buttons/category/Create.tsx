import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import FormCategories from "../../form/categories/FormCategories";

export function DialogCreateCategory() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <FormCategories />
      </DialogContent>
    </Dialog>
  );
}
