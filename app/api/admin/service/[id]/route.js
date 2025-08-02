import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";


export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    // Get user data before deletion to remove image file
    const service = await Service.findById(id);

    if (service && service.image) {
      const imagePath = path.join(
        process.cwd(),
        "public/uploads",
        service.image
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const deletedservice = await Service.findByIdAndDelete(id);
    return NextResponse.json({
      message: "service deleted successfully",
      data: deletedservice,
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { message: "Error deleting service", error: error.message },
      { status: 500 }
    );
  }
}
