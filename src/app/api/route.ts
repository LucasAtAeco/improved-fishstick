import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "World";

  const calculation = 60 * 60 * 24 * 365;

  return new NextResponse(`Hello, ${name}! Look at this: ${calculation}`, {
    status: 200,
  });
};
