"use server";

import db from "@/utils/prisma";
import fs from "fs/promises";
import { zodProduct } from "@/utils/schemas";

export async function addProduct(formData, editing, productID) {
  try {
    const category = formData.get('category')
    const newData = {
      product: formData.get("product"),
      images: formData.getAll("images"),
      description: formData.get("description"),
      price: formData.get("price"),
    };
    const validateFields = zodProduct.safeParse(newData);
    if (!validateFields.success) {
      return { errors: validateFields.error.formErrors.fieldErrors };
    }

    const data = validateFields.data;

    let imagesPath = [];

    await fs.mkdir("public/products", { recursive: true });
    const newImages = data.images.filter((img) => typeof img === "object")
    for (let i = 0; i < newImages.length; i++) {
      const img = data.images[i];
      const uuid = crypto.randomUUID();
      const imgPath = `/products/${uuid}-${img.name}`;
      imagesPath.push(imgPath);
      await fs.writeFile(
        `public${imgPath}`,
        Buffer.from(await img.arrayBuffer())
      );
    }

    if (!editing) {
      await db.product.create({
        data: {
          product: data.product,
          imagesPath,
          description: data.description,
          price: data.price,
          categoryId: parseInt(category),
        },
      });
    } else {
      await db.product.update({
        where: { id: productID },
        data: {
          product: data.product,
          imagesPath,
          description: data.description,
          price: data.price,
        },
      })
    }
    return 200;
  } catch (error) {
    console.log(error);
  }
}
