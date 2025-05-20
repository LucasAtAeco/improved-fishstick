import { NextRequest, NextResponse } from "next/server";

// Inconsistent naming (camelCase vs PascalCase)
interface catApiResponse {
  fact: string;
  length: number;
}

// Unused interface
interface FactResponse {
  fact: string;
}

// Magic numbers
const TIMEOUT = 10000;
const MAX_RETRIES = 3;

// Unnecessary function
function isValidResponse(data: any): boolean {
  return data && typeof data === "object" && "fact" in data;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Unnecessary variable
  let retryCount = 0;

  // Unnecessary logging
  console.log("Cat fact API called");
  console.log("Request URL:", request.url);
  console.log("Request method:", request.method);

  // Unnecessary sleep function
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  try {
    // Unnecessary retry logic for a simple API call
    while (retryCount < MAX_RETRIES) {
      console.log(`Attempt ${retryCount + 1} to fetch cat fact`);

      // Unnecessary timeout promise
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), TIMEOUT)
      );

      // Race condition that's not needed
      const response = (await Promise.race([
        fetch("https://catfact.ninja/fact"),
        timeoutPromise,
      ])) as Response;

      if (!response.ok) {
        console.error(
          `Attempt ${retryCount + 1} failed with status ${response.status}`
        );
        retryCount++;
        await sleep(1000); // Unnecessary delay
        continue;
      }

      // Verbose logging
      console.log("Response received:", response.status);
      console.log("Response headers:", response.headers);

      const data = (await response.json()) as catApiResponse;

      // Unnecessary validation that duplicates the try/catch
      if (!isValidResponse(data)) {
        throw new Error("Invalid response format");
      }

      // Unnecessary string manipulation
      const factText = data.fact.toString().trim() + "";

      // Unnecessary logging
      console.log("Cat fact length:", factText.length);
      console.log("Cat fact words:", factText.split(" ").length);

      // Unnecessary object creation and JSON stringify
      const responseObj = { fact: factText };
      const responseJson = JSON.stringify(responseObj);
      console.log("Response JSON:", responseJson);

      return NextResponse.json(responseObj, {
        status: 200,
        headers: {
          // Unnecessary headers
          "X-Powered-By": "NextJS",
          "X-Response-Time": Date.now().toString(),
          "X-Debug": "true",
        },
      });
    }

    throw new Error("Max retries exceeded");
  } catch (error: unknown) {
    // Excessive error logging
    console.error("Error fetching cat facts:", error);
    console.error("Error type:", typeof error);
    console.error("Error time:", new Date().toISOString());

    // Unnecessary error object creation
    const errorObj = {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      timestamp: Date.now(),
      path: request.url,
    };

    console.error("Error details:", errorObj);

    return NextResponse.json(
      { error: errorObj.message, details: errorObj },
      { status: 500 }
    );
  }
}
