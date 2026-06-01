import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { error, timestamp, source } = body;

    // Print error details to terminal
    console.error("=".repeat(60));
    console.error(`[${timestamp}] ${source} Error:`);
    console.error(JSON.stringify(error, null, 2));
    console.error("=".repeat(60));

    return NextResponse.json(
      { success: true, message: "Error logged" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Failed to process log request:", err);
    return NextResponse.json(
      { success: false, error: "Failed to log error" },
      { status: 500 }
    );
  }
}
