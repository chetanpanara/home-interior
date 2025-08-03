import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Gallary from "@/models/Gallary";



export async function GET(req, { params }) {
  await connectDB();
  const { id } = params;
  const gallary = await Gallary.findById(id);
  return NextResponse.json({
    success: true,
    data: gallary,
    message: "gallary fetched successfully",
  });
}



export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    // Parse form data
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const size = formData.get("size");
    const imageFile = formData.get("image");

    let updateData = { title, description, category, size };

    // Handle image update
    if (imageFile && imageFile.size > 0) {
      // Get existing user to remove old image
      const existingGallary = await Gallary.findById(id);
      if (existingGallary && existingGallary.image) {
        const oldImagePath = path.join(
          process.cwd(),
          "public/uploads/gallary",
          existingGallary.image
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Convert File to Buffer
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = imageFile.name.split(".").pop();
      const filename = `image-${uniqueSuffix}.${extension}`;

      // Save new file
      const uploadDir = path.join(process.cwd(), "public/uploads/gallary");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(path.join(uploadDir, filename), buffer);
      updateData.image = filename;
    }

    const updatedGallary = await Gallary.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json({
      message: "Gallary updated successfully",
      data: updatedGallary,
    });
  } catch (error) {
    console.error("Error updating Gallary:", error);
    return NextResponse.json(
      { message: "Error updating Gallary", error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    // Get user data before deletion to remove image file
    const gallary = await Gallary.findById(id);

    if (gallary && gallary.image) {
      const imagePath = path.join(
        process.cwd(),
        "public/uploads/gallary",
        gallary.image
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const deletedgallary = await Gallary.findByIdAndDelete(id);
    return NextResponse.json({
      message: "gallary deleted successfully",
      data: deletedgallary,
    });
  } catch (error) {
    console.error("Error deleting gallary:", error);
    return NextResponse.json(
      { message: "Error deleting gallary", error: error.message },
      { status: 500 }
    );
  }
}
