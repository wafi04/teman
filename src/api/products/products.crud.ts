import { toast } from "sonner";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../lib/firebaseMain";
import { BASE_URL, TOKEN } from "../../constanst";
import { ProductsForm, ProductVariant } from "../../types/products";

export class ProductsService {
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
  async createProducts(create: ProductsForm) {
    const req = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: create.name,
        description: create.description,
        seller_id: create.seller_id,
        category_id: create.categoryId,
      }),
    });

    return await req.json();
  }
  async GetProductById(id: string) {
    const req = await fetch(`${BASE_URL}/products/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    if (!req.ok) {
      toast.error("Error get product");
      throw new Error("Failed to get product");
    }

    return await req.json();
  }
  async GetProduct() {
    const req = await fetch(`${BASE_URL}/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    if (!req.ok) {
      toast.error("Error get product");
      throw new Error("Failed to get product");
    }

    return await req.json();
  }

  async updateProduct(data: ProductsForm) {
    const req = await fetch(`${BASE_URL}/products/${data.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        seller_id: data.seller_id,
        category_id: data.categoryId,
      }),
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    return await req.json();
  }

  async createVariants(data: ProductVariant) {
    const processedData = { ...data };

    // Process image upload first
    let imageUrl: string | null = null;
    if (processedData.image) {
      imageUrl = await this.getImageUrl(processedData.image);
    }
    const req = await fetch(
      `${BASE_URL}/products/${data.product_id}/variants`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          color: processedData.color,
          image: imageUrl,
          price: processedData.price,
          product_id: processedData.product_id,
          inventory: processedData.inventories,
        }),
      }
    );

    return await req.json();
  }

  async updateVariants(data: ProductVariant) {
    const processedData = { ...data };

    // Process image upload first
    let imageUrl: string | null = null;
    if (processedData.image) {
      imageUrl = await this.getImageUrl(processedData.image);
    }

    const req = await fetch(`${BASE_URL}/products/variants/${data.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        color: processedData.color,
        image: imageUrl,
        price: processedData.price,
        product_id: processedData.product_id,
        inventory: processedData.inventories,
      }),
    });

    return await req.json();
  }

  async DeleteProducts(productId: string) {
    const req = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    return await req.json();
  }

  async DeleteVariants(variants: string) {
    const req = await fetch(`${BASE_URL}/products/variants/${variants}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    return await req.json();
  }
}
