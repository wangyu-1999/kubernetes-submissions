import { NextResponse } from "next/server";

export const GET = async (_request) => {
  return NextResponse.json({ status: "ok" });
}
