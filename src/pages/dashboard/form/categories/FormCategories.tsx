import React from "react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import { Switch } from "../../../../components/ui/switch";
import { AlertCircle, Image as ImageIcon } from "lucide-react";
import { Alert, AlertDescription } from "../../../../components/ui/alert";
import { Controller, useForm } from "react-hook-form";
import { CategoriesForm } from "../../../../types/categories";
import {
  useCreateCategory,
  useUpdateCategory,
} from "../../../../api/categories/categories.query";

export interface FormCategoriesProps {
  initialData?: CategoriesForm;
}

export function FormCategories({ initialData }: FormCategoriesProps) {
  const create = useCreateCategory();
  const update = useUpdateCategory();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    (initialData?.image_url as string) || null
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CategoriesForm>({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      is_active: initialData?.is_active || false,
      image_url: null,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // Store the actual file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: CategoriesForm) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("is_active", String(data.is_active));
    if (imageFile) {
      formData.append("image_url", imageFile);
    }

    if (initialData) {
      // Update operation
      update.mutate({
        id: initialData.id,
        name: data.name,
        description: data.description as string,
        is_active: data.is_active,
        image_url: imageFile as File, // Send the actual File object
      });
    } else {
      // Create operation
      create.mutate({
        name: data.name,
        description: data.description as string,
        is_active: data.is_active,
        image_url: imageFile as File, // Send the actual File object
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-y-auto h-[70vh] mt-4">
      <CardHeader>
        <CardTitle>
          {initialData ? "Edit Category" : "Create Category"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Category name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.name.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Category description"
              className={`min-h-[100px] ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {errors.description.message}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image")?.click()}
                className="w-full">
                <ImageIcon className="w-4 h-4 mr-2" />
                Select Image
              </Button>
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full h-48 object-cover rounded-md"
                />
              </div>
            )}
            {errors.image_url && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.image_url.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              name="is_active"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={value}
                    onCheckedChange={onChange}
                  />
                  <Label htmlFor="is_active">
                    {value ? "Active" : "Inactive"}
                  </Label>
                </div>
              )}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={() => {
            reset();
            setImageFile(null);
            setImagePreview((initialData?.image_url as string) || null);
          }}
          disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}>
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Saving...
            </div>
          ) : (
            "Save"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default FormCategories;
