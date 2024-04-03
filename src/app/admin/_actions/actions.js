"use server";

import db from "@/utils/prisma";
import fs from "fs/promises";
import { zodProduct } from '@/utils/schemas'

export async function addProduct(formData) {
  try {
    const validateFields = zodProduct.safeParse({
      product: formData.get("product"),
      images: formData.getAll("image"),
      description: formData.get("description"),
      price: formData.get("price"),
    });
    if (!validateFields.success) {
      return validateFields.error.formErrors.fieldErrors;
    }

    const data = validateFields.data;
  
    let imagesPath = [];

    await fs.mkdir("public/products", { recursive: true });

    for (let i = 0; i < data.images.length; i++) {
      const img = data.images[i];
      const uuid = crypto.randomUUID();
      const imgPath = `/products/${uuid}-${img.name}`;
      imagesPath.push(imgPath);
      await fs.writeFile(
        `public${imgPath}`,
        Buffer.from(await img.arrayBuffer())
      );
    }

    await db.product.create({
      data: {
        name: data.product,
        imagesPath,
        description: data.description,
        price: data.price
      },
    });
  } catch (error) {
    console.log("Error adding product: ", error.message);
  }
}

// Add admin function
export async function addAdmin(formData) {
  try {
    if (data.password !== data.confirm_password)
      return toast.error("Passwords do not match");

    const response = await axios.post("/api/auth/register", {
      username: data.username,
      email: data.email,
      password: data.password,
    });
  } catch (error) {
    console.log("Error adding product: ", error.message);
  }
}
