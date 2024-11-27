import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../lib/firebaseMain";
import { toast } from "sonner";
import { BASE_URL, TOKEN } from "../../constanst"; // Fixed typo in 'constanst'
import { CategoriesForm } from "../../types/categories";

export class CategoriesService {
  private async uploadImage(file: File): Promise<string> {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      toast.error("Error uploading image");
      throw error; // Rethrow error for further handling
    }
  }

  private async getImageUrl(
    image: string | File | null
  ): Promise<string | null> {
    if (image instanceof File) {
      return this.uploadImage(image);
    } else if (typeof image === "string") {
      return image;
    }
    return null;
  }

  async create(create: CategoriesForm): Promise<any> {
    const processedData = { ...create };

    // Process image upload first
    let imageUrl: string | null = null;
    if (processedData.image_url) {
      imageUrl = await this.getImageUrl(processedData.image_url);
    }

    const req = await fetch(`${BASE_URL}/category`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: processedData.name,
        description: processedData.description,
        image_url: imageUrl, // Use imageUrl instead of processedData.image
        is_active: processedData.is_active,
      }),
    });

    if (!req.ok) {
      toast.error("Error creating category");
      throw new Error("Failed to create category");
    }

    return await req.json();
  }

  async getCategory(): Promise<any> {
    const res = await fetch(`${BASE_URL}/category`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      toast.error("Error fetching categories");
      throw new Error("Failed to fetch categories");
    }

    return await res.json();
  }

  async updateCategory(category: CategoriesForm): Promise<any> {
    const processedData = { ...category };

    // Process image upload first
    let imageUrl: string | null = null;
    if (processedData.image_url) {
      imageUrl = await this.getImageUrl(processedData.image_url);
    }

    if (!imageUrl) return; // Ensure imageUrl is valid

    const req = await fetch(`${BASE_URL}/category/${category.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: processedData.name,
        description: processedData.description,
        image_url: imageUrl, // Use imageUrl instead of processedData.image
        is_active: processedData.is_active,
      }),
    });

    if (!req.ok) {
      toast.error("Error updating category");
      throw new Error("Failed to update category");
    }

    return await req.json();
  }

  async Delete(categoryId: number) {
    const req = await fetch(`${BASE_URL}/category/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!req.ok) {
      toast.error("Error updating category");
      throw new Error("Failed to update category");
    }

    return await req.json();
  }
}
