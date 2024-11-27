import { useState } from "react";
import { ProductsForm } from "../../../../types/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { ProductsSchema } from "../../../../validation/products";
import { Card, CardContent } from "../../../../components/ui/card";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Alert, AlertDescription } from "../../../../components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Textarea } from "../../../../components/ui/textarea";
import { GetCategory } from "../../../../api/categories/categories.query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Button } from "../../../../components/ui/button";
import {
  useCreateProducts,
  useUpdateProducts,
} from "../../../../api/products/products.query";
import { useAuth } from "../../../../provider/AuthProvider";

interface FormProductsProps {
  initialData?: ProductsForm;
}

export function FormProducts({ initialData }: FormProductsProps) {
  const { data: category } = GetCategory();
  const create = useCreateProducts();
  const update = useUpdateProducts();
  const { user } = useAuth();
  const categoryData = category?.data;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductsForm>({
    resolver: zodResolver(ProductsSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      categoryId: initialData?.categoryId || undefined,
      seller_id: initialData?.seller_id || user?.id,
    },
  });

  const handleFormSubmit: SubmitHandler<ProductsForm> = async (data) => {
    try {
      setIsSubmitting(true);

      if (initialData) {
        update.mutate({
          categoryId: data.categoryId,
          description: data.description,
          id: initialData.id,
          name: data.name,
          seller_id: data.seller_id,
        });
      } else {
        create.mutate(data);
      }
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Category Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="categoryId">Category</Label>
            <Select
              onValueChange={(value) =>
                setValue("categoryId", parseInt(value, 10))
              }
              defaultValue={initialData?.categoryId?.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categoryData?.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.id ? cat.id.toString() : ""}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.categoryId.message}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter product name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.name.message}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Description Textarea */}
          <div className="space-y-2">
            <Label htmlFor="description">Product Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Enter product description"
              className={`min-h-[100px] ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {errors.description.message}
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Save Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
