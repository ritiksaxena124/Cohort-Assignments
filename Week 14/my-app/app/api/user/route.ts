import { NextRequest } from "next/server";

export function GET(request: Request) {
  return Response.json({
    name: "Hello World!!!!",
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  console.log(body);

  // return some response
  return Response.json({
    message: "Registration successful",
  });
}
