import { AlertCircle, Trash2, Plus } from "lucide-react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Card, CardContent } from "../../../../components/ui/card";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { ProductVariant } from "../../../../types/products";
import { useState } from "react";
import { COLOR, STEPS } from "../../../../constanst";
import {
  useCreateVariants,
  useUpdateVariants,
} from "../../../../api/products/products.query";

export function FormVariants({
  initialData,
  productId,
}: {
  productId?: string;
  initialData?: ProductVariant;
}) {
  const [currentStep, setCurrentStep] = useState<STEPS>(STEPS.DETAILS);
  const [imagePreview, setImagePreview] = useState<string | null>(
    (initialData?.image as string) || null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const variants = useCreateVariants();
  const update = useUpdateVariants();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialData ?? {
      image: null,
      product_id: productId,
      color: "",
      price: 0,
      inventories: [{ size: "", quantity: 0 }],
    },
  });

  // Field Array for dynamic inventories
  const { fields, append, remove } = useFieldArray({
    control,
    name: "inventories",
  });

  // Image preview handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFormSubmit = (data: ProductVariant) => {
    if (productId) {
      variants.mutate({
        image: imageFile,
        color: data.color,
        price: data.price,
        product_id: productId,
        inventories: data.inventories,
      });
    } else {
      update.mutate({
        image: imageFile,
        color: data.color,
        price: data.price,
        product_id: productId as string,
        id: data.id,
        inventories: data.inventories,
      });
    }
    console.log(data);
  };

  const nextStep = () => {
    if (currentStep < STEPS.INVENTORY) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > STEPS.DETAILS) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case STEPS.DETAILS:
        return (
          <div className="space-y-4">
            {/* Color Select */}
            <div>
              <Label>Color</Label>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent>
                      {COLOR.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.color && (
                <div className="text-red-500 flex items-center mt-1">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  {errors.color.message}
                </div>
              )}
            </div>

            {/* Price Input */}
            <div>
              <Label>Price</Label>
              <Input
                type="number"
                {...register("price", {
                  setValueAs: (v) => parseFloat(v),
                })}
                placeholder="Enter price"
              />
              {errors.price && (
                <div className="text-red-500 flex items-center mt-1">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  {errors.price.message}
                </div>
              )}
            </div>
          </div>
        );

      case STEPS.IMAGE:
        return (
          <div className="space-y-4">
            <Label>Variant Image</Label>
            <Input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-4">
                <Label>Image Preview</Label>
                <img
                  src={imagePreview}
                  alt="Variant Preview"
                  className="w-full h-32 rounded-md mt-2"
                />
              </div>
            )}
            {errors.image && (
              <div className="text-red-500 flex items-center mt-1">
                <AlertCircle className="mr-2 h-4 w-4" />
                {errors.image?.message}
              </div>
            )}
          </div>
        );

      case STEPS.INVENTORY:
        return (
          <div className="space-y-4 w-full">
            <Label>Inventory</Label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 w-full">
                <div>
                  <Label>Size</Label>
                  <Input
                    {...register(`inventories.${index}.size` as const)}
                    placeholder="Enter size"
                  />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    {...register(`inventories.${index}.quantity` as const, {
                      setValueAs: (v) => parseInt(v, 10),
                    })}
                    placeholder="Enter quantity"
                  />
                </div>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                    className="self-end">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ size: "", quantity: 0 })}
              className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Inventory Item
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4">
      <CardContent>
        <div className="space-y-4">
          {renderStepContent()}

          <div className="flex justify-between">
            {currentStep > STEPS.DETAILS && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}

            {currentStep < STEPS.INVENTORY ? (
              <Button type="button" onClick={nextStep} className="ml-auto">
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit(handleFormSubmit)}
                className="ml-auto">
                Save Variant
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
