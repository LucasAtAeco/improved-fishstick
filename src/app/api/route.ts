import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://dog-api.kinduff.com/api/facts");
    if (!response.ok) {
      throw new Error("Failed to fetch dog facts");
    }

    const data = await response.json();

    // Return a proper JSON object with the fact
    return NextResponse.json(
      { fact: data.facts[0] },
      {
        status: 200,
      }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
