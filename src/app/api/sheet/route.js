import { NextResponse } from "next/server";
import { topics } from "@/lib/data";

export async function GET() {
  return NextResponse.json(topics);
}
