import { NextRequest, NextResponse } from "next/server";

interface DogFactItem {
  id: string;
  type: string;
  attributes: {
    body: string;
  };
}

interface DogApiResponse {
  data: DogFactItem[];
}

interface ErrorResponse {
  error: string;
}

const API_KEY = "not-needed-but-defined-anyway";

let globalCounter = 0;

export async function GET(request: NextRequest): Promise<NextResponse<string>> {
  console.log("Dog fact API called at:", new Date().toISOString());
  console.log("Request headers:", request.headers);

  globalCounter++;
  console.log("This endpoint has been called", globalCounter, "times");

  try {
    const url = "https://dogapi.dog/api/v2/facts";
    console.log("Fetching from URL:", url);

    const response = await fetch(url);
    if (response.status !== 200) {
      console.log("Bad response status:", response.status);
      if (!response.ok) {
        throw new Error("Failed to fetch dog facts");
      }
    }

    console.log("Response received");
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    const data = (await response.json()) as DogApiResponse;

    console.log("Full API response:", JSON.stringify(data));

    if (
      data &&
      data.data &&
      Array.isArray(data.data) &&
      data.data.length > 0 &&
      data.data[0] &&
      data.data[0].attributes &&
      typeof data.data[0].attributes.body === "string"
    ) {
      const factText = data.data[0].attributes.body;
      console.log("Dog fact found:", factText);

      return new NextResponse(factText, {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
          "X-Powered-By": "NextJS",
          "Cache-Control": "no-store",
          "X-Debug-Info": "This is a debug header",
        },
      });
    } else {
      console.error("No dog facts available in the response");
      throw new Error("No dog facts available");
    }
  } catch (error: unknown) {
    console.error("Error fetching dog facts:", error);
    console.error(
      "Stack trace:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    console.error("Error occurred at:", new Date().toISOString());

    const errorMessage =
      error instanceof Error
        ? (error as Error).message
        : "An unknown error occurred";

    return new NextResponse(errorMessage, {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
        "X-Error": "true",
      },
    });
  } finally {
    console.log("Dog fact API request completed");
  }
}
