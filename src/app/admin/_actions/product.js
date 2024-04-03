"use server";

import db from "@/utils/prisma";
import fs from "fs/promises";
import { redirect } from "next/navigation";

export async function addProduct(formData) {
  try {
    const product = formData.get("product");
    const images = formData.getAll("image");
    const description = formData.get("description");
    const price = formData.get("price");

    let imagesPath = [];

    await fs.mkdir("public/products", { recursive: true });

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
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
        name: product,
        description,
        price: parseInt(price),
        imagesPath,
      },
    });

    redirect("/admin/products");
  } catch (error) {
    console.log("Error adding product: ", error.message);
  }
}
