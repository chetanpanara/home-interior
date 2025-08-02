import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import { NextResponse } from "next/server";


export async function GET() {
  await connectDB();
  const cardData = await Service.find();
  return NextResponse.json({
    success: true,
    data: cardData,
    message: "Services fetched successfully",
  });
}

export async function POST(req) {
  try {
    await connectDB();

    // Parse form data
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const imageFile = formData.get("image");

    let imagePath = "";

    if (imageFile && imageFile.size > 0) {
      // Convert File to Buffer
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = imageFile.name.split(".").pop();
      const filename = `image-${uniqueSuffix}.${extension}`;

      // Save file
      const fs = require("fs");
      const path = require("path");
      const uploadDir = path.join(process.cwd(), "public/uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(path.join(uploadDir, filename), buffer);
      imagePath = filename;
    }

    const newUser = new Service({
      title,
      description,
      image: imagePath,
    });

    await newUser.save();

    return NextResponse.json({
      message: "services created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating services:", error);
    return NextResponse.json(
      { message: "Error creating services", error: error.message },
      { status: 500 }
    );
  }
}