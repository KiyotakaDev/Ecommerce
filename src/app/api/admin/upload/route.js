import { NextResponse } from 'next/server'
import fs from 'fs/promises'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const images = formData.getAll('images')
    
    let imagesPath = [];

    await fs.mkdir("public/products", { recursive: true });
    const newImages = images.filter((img) => typeof img === "object")
    for (let i = 0; i < newImages.length; i++) {
      const img = images[i];
      const uuid = crypto.randomUUID();
      const imgPath = `/products/${uuid}-${img.name}`;
      imagesPath.push(imgPath);
      await fs.writeFile(
        `public${imgPath}`,
        Buffer.from(await img.arrayBuffer())
      );
    }

    return NextResponse.json({ imagesPath, message: "Image uploaded!" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}